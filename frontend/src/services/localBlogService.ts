import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Article interface that matches our JSON structure
export interface LocalArticle {
  id: string;
  title: { en: string; es: string };
  slug: string;
  excerpt: { en: string; es: string };
  content: { en: string; es: string };
  category: string;
  author: {
    name: string;
    credentials: string;
    specialty: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
  tags: { en: string[]; es: string[] };
  seo: {
    en: { title: string; description: string; keywords: string };
    es: { title: string; description: string; keywords: string };
  };
}

interface ArticleIndex {
  articles: LocalArticle[];
  lastUpdated: string;
}

interface UseBlogDataOptions {
  searchTerm?: string;
  categoryFilter?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}

interface BlogDataResult {
  articles: LocalArticle[];
  categories: Array<{ key: string; label: string; color: string; icon: string }>;
  loading: boolean;
  error: string | null;
  total: number;
  hasNextPage: boolean;
  refresh: () => void;
}

// Category definitions
const CATEGORIES = [
  { key: 'all', label: 'All Articles', color: '#6B7280', icon: '📰' },
  { key: 'treatment', label: 'Treatment', color: '#4F46E5', icon: '🏥' },
  { key: 'legal', label: 'Legal', color: '#059669', icon: '⚖️' },
  { key: 'recovery', label: 'Recovery', color: '#DC2626', icon: '💪' }
];

export const useLocalBlogData = (options: UseBlogDataOptions = {}): BlogDataResult => {
  const {
    searchTerm = '',
    categoryFilter = 'all',
    page = 1,
    pageSize = 6,
    featured
  } = options;

  const [articles, setArticles] = useState<LocalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'es';

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load articles index
      const response = await fetch('/data/articles/index.json');
      if (!response.ok) {
        throw new Error('Failed to load articles');
      }
      
      const data: ArticleIndex = await response.json();
      let filteredArticles = data.articles;

      // Filter by featured
      if (featured !== undefined) {
        filteredArticles = filteredArticles.filter(article => article.featured === featured);
      }

      // Filter by category
      if (categoryFilter && categoryFilter !== 'all') {
        filteredArticles = filteredArticles.filter(article => article.category === categoryFilter);
      }

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredArticles = filteredArticles.filter(article => {
          const title = article.title[currentLang].toLowerCase();
          const excerpt = article.excerpt[currentLang].toLowerCase();
          const tags = article.tags[currentLang].join(' ').toLowerCase();
          return title.includes(term) || excerpt.includes(term) || tags.includes(term);
        });
      }

      setTotal(filteredArticles.length);

      // Paginate
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

      setArticles(paginatedArticles);
      setLoading(false);
    } catch (err) {
      console.error('Error loading articles:', err);
      setError('Failed to load articles');
      setArticles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, categoryFilter, page, pageSize, featured, currentLang]);

  const hasNextPage = page * pageSize < total;

  return {
    articles,
    categories: CATEGORIES,
    loading,
    error,
    total,
    hasNextPage,
    refresh: loadData
  };
};

// Hook to load individual article
export const useLocalArticle = (slug: string) => {
  const [article, setArticle] = useState<LocalArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/data/articles/${slug}.json`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const articleData: LocalArticle = await response.json();
        setArticle(articleData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
        setArticle(null);
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  return { article, loading, error };
};