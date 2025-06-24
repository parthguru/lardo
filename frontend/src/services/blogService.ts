import { useState, useEffect } from 'react';
import { useStrapiApi, BlogArticle } from './strapiApi';
import { fallbackArticles, fallbackCategories } from './fallbackData';

interface UseBlogDataOptions {
  searchTerm?: string;
  categoryFilter?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}

interface BlogDataResult {
  articles: BlogArticle[];
  categories: Array<{ key: string; label: string; color: string; icon: string }>;
  loading: boolean;
  error: string | null;
  total: number;
  hasNextPage: boolean;
  refresh: () => void;
}

export const useBlogData = (options: UseBlogDataOptions = {}): BlogDataResult => {
  const {
    searchTerm = '',
    categoryFilter = 'all',
    page = 1,
    pageSize = 5,
    featured
  } = options;

  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  const strapiApi = useStrapiApi();

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from Strapi first
      const [articlesResult, categoriesResult] = await Promise.all([
        strapiApi.getArticles({
          search: searchTerm || undefined,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          featured,
          page,
          pageSize
        }).catch(err => {
          console.warn('Articles API failed:', err);
          return { articles: [], total: 0, page: 1, pageSize: 10 };
        }),
        strapiApi.getCategories().catch(err => {
          console.warn('Categories API failed:', err);
          return fallbackCategories;
        })
      ]);

      setArticles(articlesResult.articles);
      setCategories(categoriesResult);
      setTotal(articlesResult.total);
      setUseFallback(false);
    } catch (err) {
      console.warn('Strapi API unavailable, using fallback data:', err);
      
      // Use fallback data
      setUseFallback(true);
      
      let filteredArticles = [...fallbackArticles];

      // Apply search filter
      if (searchTerm) {
        filteredArticles = filteredArticles.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.preview.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply category filter
      if (categoryFilter !== 'all') {
        filteredArticles = filteredArticles.filter(article =>
          article.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      // Apply featured filter
      if (featured !== undefined) {
        // For fallback data, treat first 3 articles as featured
        if (featured) {
          filteredArticles = filteredArticles.slice(0, 3);
        }
      }

      // Sort by publish date (newest first)
      filteredArticles.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      // Apply pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

      setArticles(paginatedArticles);
      setCategories(fallbackCategories);
      setTotal(filteredArticles.length);
      setError('Using offline data - Strapi CMS unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, categoryFilter, page, pageSize, featured]);

  const hasNextPage = page * pageSize < total;

  return {
    articles,
    categories,
    loading,
    error,
    total,
    hasNextPage,
    refresh: loadData
  };
};

// Hook for getting a single article by ID
export const useArticle = (articleId: string) => {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const strapiApi = useStrapiApi();

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try Strapi first
        const strapiArticle = await strapiApi.getArticleBySlug(articleId);
        if (strapiArticle) {
          setArticle(strapiArticle);
        } else {
          // Fall back to local data
          const fallbackArticle = fallbackArticles.find(a => a.id === articleId);
          setArticle(fallbackArticle || null);
        }
      } catch (err) {
        console.warn('Strapi API unavailable, using fallback data:', err);
        const fallbackArticle = fallbackArticles.find(a => a.id === articleId);
        setArticle(fallbackArticle || null);
        setError('Using offline data - Strapi CMS unavailable');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  return { article, loading, error };
};