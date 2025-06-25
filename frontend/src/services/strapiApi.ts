import { useTranslation } from 'react-i18next';

// Load from local JSON files - no backend needed
const STRAPI_BASE_URL = '';

export interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    readingTime: number;
    featured: boolean;
    publishDate: string;
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          color: string;
          icon: string;
        };
      };
    };
    author: {
      data: {
        id: number;
        attributes: {
          name: string;
          credentials: string;
          specialty: string;
          bio: string;
        };
      };
    };
    tags: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    locale: string;
    localizations: {
      data: Array<{
        id: number;
        attributes: {
          locale: string;
        };
      }>;
    };
  };
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    color: string;
    icon: string;
    displayOrder: number;
    locale: string;
  };
}

export interface StrapiAuthor {
  id: number;
  attributes: {
    name: string;
    credentials: string;
    specialty: string;
    bio: string;
    languages: string[];
    locale: string;
  };
}

export interface BlogArticle {
  id: string;
  category: string;
  title: string;
  preview: string;
  content: string;
  readingTime: number;
  publishDate: string;
  author?: string;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

class StrapiApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = STRAPI_BASE_URL;
  }

  private async fetchFromStrapi(endpoint: string, params: Record<string, any> = {}) {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const url = `${this.baseUrl}/api/${endpoint}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Strapi API Error:', error);
      throw error;
    }
  }

  async getArticles(params: {
    locale?: string;
    search?: string;
    category?: string;
    featured?: boolean;
    page?: number;
    pageSize?: number;
    sort?: string;
  } = {}): Promise<{ articles: BlogArticle[]; total: number; page: number; pageSize: number }> {
    const {
      locale = 'en',
      search,
      category,
      featured,
      page = 1,
      pageSize = 10
    } = params;

    try {
      // Load from local JSON files instead of API
      const response = await fetch('/data/articles/index.json');
      if (!response.ok) {
        throw new Error(`Failed to load articles: ${response.status}`);
      }
      
      const data = await response.json();
      const articlesData = data.articles || [];
      
      // Filter articles data first, then transform
      let filteredArticlesData = articlesData.filter((article: any) => {
        // Filter by publishDate
        const publishDate = new Date(article.publishedAt || article.publishDate);
        const now = new Date();
        return publishDate <= now; // Only show articles with publishDate in the past
      });

      // Apply featured filter
      if (featured !== undefined) {
        filteredArticlesData = filteredArticlesData.filter((article: any) => {
          const isFeatured = article.featured === true;
          return featured === isFeatured;
        });
      }

      // Apply category filter
      if (category && category !== 'all') {
        filteredArticlesData = filteredArticlesData.filter((article: any) =>
          article.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Transform articles to match BlogArticle interface
      let articles: BlogArticle[] = filteredArticlesData
        .map((article: any) => this.transformJsonArticle(article, locale));
      
      // Apply search filter (after transformation to search in localized content)
      if (search) {
        articles = articles.filter(article =>
          article.title.toLowerCase().includes(search.toLowerCase()) ||
          article.content.toLowerCase().includes(search.toLowerCase()) ||
          article.preview.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sort by publishDate
      articles.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      // Apply pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = articles.slice(startIndex, endIndex);
      
      return {
        articles: paginatedArticles,
        total: articles.length,
        page,
        pageSize
      };
    } catch (error) {
      console.error('Error fetching articles:', error);
      return { articles: [], total: 0, page: 1, pageSize: 10 };
    }
  }

  async getArticleBySlug(slug: string, locale: string = 'en'): Promise<BlogArticle | null> {
    try {
      // Load individual article file
      const response = await fetch(`/data/articles/${slug}.json`);
      if (!response.ok) {
        return null;
      }
      
      const articleData = await response.json();
      return this.transformJsonArticle(articleData, locale);
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      return null;
    }
  }

  async getCategories(locale: string = 'en'): Promise<{ key: string; label: string; color: string; icon: string }[]> {
    try {
      const response = await this.fetchFromStrapi('categories');
      
      // Handle empty categories or different response formats
      const categoriesData = response.data || response || [];
      const categories = categoriesData.map((category: any) => ({
        key: category.attributes?.slug || category.slug || 'category-' + category.id,
        label: category.attributes?.name || category.name || 'Category',
        color: category.attributes?.color || category.color || '#666',
        icon: category.attributes?.icon || category.icon || '📂'
      }));

      // Return fallback categories since your Strapi doesn't have categories set up yet
      return [
        { key: 'all', label: 'All Categories', color: '#666', icon: '📚' },
        { key: 'treatment', label: 'Treatment', color: '#2C5AA0', icon: '🏥' },
        { key: 'legal', label: 'Legal', color: '#059669', icon: '⚖️' },
        { key: 'recovery', label: 'Recovery', color: '#DC2626', icon: '💪' },
        ...categories
      ];
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return fallback categories on error
      return [
        { key: 'all', label: 'All Categories', color: '#666', icon: '📚' },
        { key: 'treatment', label: 'Treatment', color: '#2C5AA0', icon: '🏥' },
        { key: 'legal', label: 'Legal', color: '#059669', icon: '⚖️' },
        { key: 'recovery', label: 'Recovery', color: '#DC2626', icon: '💪' }
      ];
    }
  }

  async getFeaturedArticles(locale: string = 'en', limit: number = 5): Promise<BlogArticle[]> {
    const result = await this.getArticles({
      locale,
      featured: true,
      pageSize: limit,
      sort: 'publishDate:desc'
    });
    
    return result.articles;
  }

  private async transformJsonArticleAsync(jsonArticle: any, locale: string = 'en', loadFullContent: boolean = false): Promise<BlogArticle> {
    // Handle bilingual content
    const getLocalizedText = (field: any): string => {
      if (typeof field === 'string') return field;
      if (typeof field === 'object' && field !== null) {
        return field[locale] || field['en'] || '';
      }
      return '';
    };

    // Extract author name
    const authorName = jsonArticle.author?.name || '';

    // Load full content if requested and not already present
    let content = getLocalizedText(jsonArticle.content);
    if (loadFullContent && !content) {
      try {
        const response = await fetch(`/data/articles/${jsonArticle.id}.json`);
        if (response.ok) {
          const fullArticle = await response.json();
          content = getLocalizedText(fullArticle.content);
        }
      } catch (error) {
        console.warn(`Failed to load full content for article ${jsonArticle.id}:`, error);
      }
    }

    return {
      id: jsonArticle.id,
      category: jsonArticle.category || 'Uncategorized',
      title: getLocalizedText(jsonArticle.title),
      preview: getLocalizedText(jsonArticle.excerpt),
      content: content,
      readingTime: jsonArticle.readTime || jsonArticle.readingTime || 1,
      publishDate: jsonArticle.publishedAt || jsonArticle.publishDate || new Date().toISOString(),
      author: authorName,
      tags: Array.isArray(jsonArticle.tags?.[locale]) ? jsonArticle.tags[locale] : [],
      seo: {
        title: jsonArticle.seo?.[locale]?.title,
        description: jsonArticle.seo?.[locale]?.description,
        keywords: jsonArticle.seo?.[locale]?.keywords
      }
    };
  }

  private transformJsonArticle(jsonArticle: any, locale: string = 'en'): BlogArticle {
    // Handle bilingual content
    const getLocalizedText = (field: any): string => {
      if (typeof field === 'string') return field;
      if (typeof field === 'object' && field !== null) {
        return field[locale] || field['en'] || '';
      }
      return '';
    };

    // Extract author name
    const authorName = jsonArticle.author?.name || '';

    return {
      id: jsonArticle.id,
      category: jsonArticle.category || 'Uncategorized',
      title: getLocalizedText(jsonArticle.title),
      preview: getLocalizedText(jsonArticle.excerpt),
      content: getLocalizedText(jsonArticle.content) || 'Content will be loaded when expanded.',
      readingTime: jsonArticle.readTime || jsonArticle.readingTime || 1,
      publishDate: jsonArticle.publishedAt || jsonArticle.publishDate || new Date().toISOString(),
      author: authorName,
      tags: Array.isArray(jsonArticle.tags?.[locale]) ? jsonArticle.tags[locale] : [],
      seo: {
        title: jsonArticle.seo?.[locale]?.title,
        description: jsonArticle.seo?.[locale]?.description,
        keywords: jsonArticle.seo?.[locale]?.keywords
      }
    };
  }

  private transformArticle(strapiArticle: StrapiArticle): BlogArticle {
    const { attributes } = strapiArticle;
    
    return {
      id: strapiArticle.id.toString(),
      category: attributes.category?.data?.attributes?.name || 'Uncategorized',
      title: attributes.title,
      preview: attributes.excerpt,
      content: attributes.content,
      readingTime: attributes.readingTime,
      publishDate: attributes.publishDate,
      author: attributes.author?.data?.attributes?.name,
      tags: attributes.tags?.data?.map(tag => tag.attributes.name) || [],
      seo: {
        title: attributes.seoTitle,
        description: attributes.seoDescription,
        keywords: attributes.seoKeywords
      }
    };
  }

  private transformSimpleArticle(article: any): BlogArticle {
    return {
      id: article.id.toString(),
      category: article.category || 'Uncategorized',
      title: article.title,
      preview: article.excerpt,
      content: article.content,
      readingTime: article.readingTime || 1,
      publishDate: article.publishDate,
      author: article.author,
      tags: article.tags || [],
      seo: {
        title: article.seoTitle,
        description: article.seoDescription,
        keywords: article.seoKeywords
      }
    };
  }
}

// Create a singleton instance
export const strapiApi = new StrapiApiService();

// Hook for using Strapi API with current locale
export const useStrapiApi = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language === 'es' ? 'es' : 'en';

  return {
    getArticles: (params = {}) => strapiApi.getArticles({ ...params, locale: currentLocale }),
    getArticleBySlug: (slug: string) => strapiApi.getArticleBySlug(slug, currentLocale),
    getCategories: () => strapiApi.getCategories(currentLocale),
    getFeaturedArticles: (limit?: number) => strapiApi.getFeaturedArticles(currentLocale, limit),
  };
};