import { useTranslation } from 'react-i18next';

const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

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
      pageSize = 10,
      sort = 'publishDate:desc'
    } = params;

    try {
      const response = await this.fetchFromStrapi('articles');
      console.log('Strapi API Response:', response); // DEBUG
      
      // Handle Strapi v5 direct array response format
      let articles: BlogArticle[];
      let pagination = { total: 0, page: 1, pageSize: 10 };
      
      if (Array.isArray(response)) {
        // Direct array response (your current format)
        articles = response
          .map(article => this.transformSimpleArticle(article))
          .filter(article => {
            // Filter by publishDate instead of publishedAt
            const publishDate = new Date(article.publishDate);
            const now = new Date();
            return publishDate <= now; // Only show articles with publishDate in the past
          });
        
        // Apply search filter
        if (search) {
          articles = articles.filter(article =>
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.content.toLowerCase().includes(search.toLowerCase()) ||
            article.preview.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Apply category filter
        if (category && category !== 'all') {
          articles = articles.filter(article =>
            article.category.toLowerCase() === category.toLowerCase()
          );
        }

        // Apply featured filter
        if (featured !== undefined) {
          // For your format, treat articles with featured=true as featured
          articles = articles.filter(article => {
            // Since we don't have featured field in the simple format, skip this filter
            return true;
          });
        }

        // Sort by publishDate
        articles.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedArticles = articles.slice(startIndex, endIndex);
        
        pagination = { total: articles.length, page, pageSize };
        articles = paginatedArticles;
      } else if (response.data && Array.isArray(response.data)) {
        // Strapi v5 standard format with data array
        articles = response.data.map((article: any) => this.transformSimpleArticle(article));
        pagination = response.meta?.pagination || pagination;
      } else {
        // Fallback
        articles = [];
      }
      
      console.log('Transformed articles:', articles); // DEBUG
      
      return {
        articles,
        total: pagination.total,
        page: pagination.page,
        pageSize: pagination.pageSize
      };
    } catch (error) {
      console.error('Error fetching articles:', error);
      return { articles: [], total: 0, page: 1, pageSize: 10 };
    }
  }

  async getArticleBySlug(slug: string, locale: string = 'en'): Promise<BlogArticle | null> {
    try {
      const queryParams = {
        locale,
        status: 'published', // Use Strapi v5 status parameter
        filters: {
          slug: { $eq: slug }
        },
        populate: {
          category: true,
          author: true,
          tags: true,
          localizations: true
        }
      };

      const response = await this.fetchFromStrapi('articles', queryParams);
      
      if (response.data && response.data.length > 0) {
        return this.transformArticle(response.data[0]);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      return null;
    }
  }

  async getCategories(locale: string = 'en'): Promise<{ key: string; label: string; color: string; icon: string }[]> {
    try {
      // Simplified API call without complex parameters to avoid 500 error
      const response = await this.fetchFromStrapi('categories');
      console.log('Categories API Response:', response); // DEBUG
      
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