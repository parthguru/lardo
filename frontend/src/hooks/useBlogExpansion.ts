import { useState, useCallback } from 'react';

export const useBlogExpansion = () => {
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const toggleArticle = useCallback((articleId: string) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  }, []);

  const expandArticle = useCallback((articleId: string) => {
    setExpandedArticles(prev => new Set(prev).add(articleId));
  }, []);

  const collapseArticle = useCallback((articleId: string) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev);
      newSet.delete(articleId);
      return newSet;
    });
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedArticles(new Set());
  }, []);

  const expandAll = useCallback((articleIds: string[]) => {
    setExpandedArticles(new Set(articleIds));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryFilter('all');
  }, []);

  return {
    expandedArticles,
    searchTerm,
    categoryFilter,
    toggleArticle,
    expandArticle,
    collapseArticle,
    collapseAll,
    expandAll,
    setSearchTerm,
    setCategoryFilter,
    clearSearch,
    resetFilters
  };
};