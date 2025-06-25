import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useBlogExpansion } from '../../hooks/useBlogExpansion';
import { useLocalBlogData } from '../../services/localBlogService';
import StructuredData from '../seo/StructuredData';

const BlogSection = styled.section`
  padding: var(--space-20) 0;
  background: var(--color-gray-50);

  @media (max-width: 768px) {
    padding: var(--space-16) 0;
  }
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: 0 var(--space-6);

  @media (max-width: 768px) {
    padding: 0 var(--space-4);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-16);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: var(--space-12);
  }

  h2 {
    font-size: var(--font-size-4xl);
    color: var(--color-primary-600);
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
      margin-bottom: var(--space-3);
    }
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-gray-700);
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }
`;

const ErrorMessage = styled.div`
  background: var(--color-orange-50);
  border: 1px solid var(--color-orange-200);
  color: var(--color-orange-800);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  .icon {
    font-size: var(--font-size-base);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-12);
  color: var(--color-gray-600);
  font-size: var(--font-size-lg);

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid var(--color-gray-300);
    border-radius: 50%;
    border-top-color: var(--color-primary-600);
    animation: spin 1s ease-in-out infinite;
    margin-right: var(--space-3);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const BlogControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-12);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-6);
  }

  @media (max-width: 768px) {
    margin-bottom: var(--space-8);
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    padding-left: var(--space-12);
    border: 2px solid var(--color-gray-300);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-default);

    @media (max-width: 768px) {
      padding: var(--space-3) var(--space-3);
      padding-left: var(--space-10);
      font-size: var(--font-size-sm);
    }

    &:focus {
      border-color: var(--color-primary-500);
      outline: none;
      box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    left: var(--space-4);
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--font-size-lg);
    color: var(--color-gray-500);

    @media (max-width: 768px) {
      left: var(--space-3);
      font-size: var(--font-size-base);
    }
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: var(--space-1);
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'var(--color-primary-600)' : 'var(--color-white)'};
  color: ${props => props.active ? 'var(--color-white)' : 'var(--color-primary-600)'};
  border: 2px solid var(--color-primary-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-xs);
  }

  &:hover {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  gap: var(--space-8);

  @media (max-width: 768px) {
    gap: var(--space-6);
  }
`;

const BlogCard = styled(motion.article)`
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-default);

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    border-radius: var(--radius-lg);
  }
`;

const BlogHeader = styled.div`
  padding: var(--space-8);
  cursor: pointer;

  @media (max-width: 768px) {
    padding: var(--space-6);
  }

  .category {
    background: var(--color-primary-50);
    color: var(--color-primary-700);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    font-weight: 600;
    display: inline-block;
    margin-bottom: var(--space-3);

    @media (max-width: 768px) {
      font-size: var(--font-size-xs);
      margin-bottom: var(--space-2);
    }
  }

  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-gray-900);
    margin-bottom: var(--space-3);
    line-height: 1.3;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-2);
      line-height: 1.25;
    }
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
    line-height: 1.6;
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-3);
      line-height: 1.5;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      gap: var(--space-3);
      font-size: var(--font-size-xs);
      flex-wrap: wrap;
    }

    .reading-time {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
  }
`;

const ExpandButton = styled.button`
  background: var(--color-primary-600);
  color: var(--color-white);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-xs);
    width: 100%;
    justify-content: center;
  }

  &:hover {
    background: var(--color-primary-700);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  .arrow {
    transition: transform var(--transition-default);
  }

  &.expanded .arrow {
    transform: rotate(180deg);
  }
`;

const BlogContent = styled(motion.div)`
  padding: var(--space-8);
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);

  @media (max-width: 768px) {
    padding: var(--space-6);
  }

  .content-text {
    font-size: var(--font-size-base);
    color: var(--color-gray-800);
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--font-size-2xl);
      color: var(--color-primary-600);
      font-weight: 700;
      margin-bottom: var(--space-4);
      margin-top: var(--space-6);

      @media (max-width: 768px) {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-3);
        margin-top: var(--space-4);
      }
    }

    h4 {
      font-size: var(--font-size-xl);
      color: var(--color-primary-700);
      font-weight: 600;
      margin-bottom: var(--space-3);
      margin-top: var(--space-5);

      @media (max-width: 768px) {
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-2);
        margin-top: var(--space-4);
      }
    }

    p {
      font-size: var(--font-size-base);
      color: var(--color-gray-800);
      line-height: 1.6;
      margin-bottom: var(--space-4);

      @media (max-width: 768px) {
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-3);
        line-height: 1.5;
      }
    }

    ul, ol {
      margin: var(--space-4) 0;
      padding-left: var(--space-6);
      
      @media (max-width: 768px) {
        margin: var(--space-3) 0;
        padding-left: var(--space-5);
      }
      
      li {
        font-size: var(--font-size-base);
        color: var(--color-gray-800);
        line-height: 1.6;
        margin-bottom: var(--space-2);

        @media (max-width: 768px) {
          font-size: var(--font-size-sm);
          margin-bottom: var(--space-1);
          line-height: 1.5;
        }
      }
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-12);

  @media (max-width: 768px) {
    margin-top: var(--space-8);
    gap: var(--space-2);
    flex-wrap: wrap;
  }
`;

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: ${props => props.active ? 'var(--color-primary-600)' : 'var(--color-white)'};
  color: ${props => props.active ? 'var(--color-white)' : 'var(--color-primary-600)'};
  border: 2px solid var(--color-primary-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-xs);
    min-width: 40px;
    height: 40px;
  }

  &:hover:not(:disabled) {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: var(--color-gray-300);
    color: var(--color-gray-500);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;

const PaginationInfo = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0 var(--space-4);

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    margin: 0 var(--space-2);
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: var(--space-3);
  }
`;

const ARTICLES_PER_PAGE = 5;

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { expandedArticles, searchTerm, categoryFilter, toggleArticle, setSearchTerm, setCategoryFilter } = useBlogExpansion();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedArticles, setLoadedArticles] = useState<Map<string, any>>(new Map());
  const currentLang = i18n.language as 'en' | 'es';

  // Use the local blog data service
  const { articles, categories, loading, error, total } = useLocalBlogData({
    searchTerm,
    categoryFilter,
    page: currentPage,
    pageSize: ARTICLES_PER_PAGE
  });

  // Pagination logic
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = Math.min(startIndex + ARTICLES_PER_PAGE, total);

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  // Load full article content when expanded
  const loadArticleContent = async (articleId: string) => {
    if (loadedArticles.has(articleId)) return;

    try {
      const article = articles.find(a => a.id === articleId);
      if (!article) return;

      const response = await fetch(`/data/articles/${article.slug}.json`);
      if (response.ok) {
        const fullArticle = await response.json();
        setLoadedArticles(prev => new Map(prev).set(articleId, fullArticle));
      }
    } catch (error) {
      console.error('Error loading article content:', error);
    }
  };

  // Handle article expansion
  const handleToggleArticle = async (articleId: string) => {
    toggleArticle(articleId);
    if (!expandedArticles.has(articleId)) {
      await loadArticleContent(articleId);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ←
      </PaginationButton>
    );

    // First page if not visible
    if (startPage > 1) {
      buttons.push(
        <PaginationButton
          key={1}
          onClick={() => handlePageChange(1)}
          active={currentPage === 1}
        >
          1
        </PaginationButton>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }

    // Visible page numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <PaginationButton
          key={page}
          onClick={() => handlePageChange(page)}
          active={currentPage === page}
        >
          {page}
        </PaginationButton>
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
      buttons.push(
        <PaginationButton
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </PaginationButton>
      );
    }

    // Next button
    buttons.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        →
      </PaginationButton>
    );

    return buttons;
  };

  // Blog Schema Data
  const blogSchemaData = {
    name: t('blog.title'),
    description: t('blog.subtitle'),
    articles: articles.map(article => ({
      title: article.title[currentLang] || article.title.en,
      excerpt: article.excerpt[currentLang] || article.excerpt.en,
      publishDate: article.publishedAt,
      lastReviewed: article.lastReviewed || article.publishedAt,
      author: {
        name: article.author?.name || 'Dr. Medical Expert'
      },
      focusKeyword: article.seo?.focusKeyword || 'car accident treatment',
      localKeywords: article.seo?.localKeywords || 'Laredo medical care, auto injury treatment',
      wordCount: article.wordCount || 800,
      category: article.category,
      featuredImage: {
        url: article.featuredImage || '/images/laredo-medical-logo.svg'
      }
    }))
  };

  return (
    <>
      {/* Blog Structured Data */}
      <StructuredData type="blog" data={blogSchemaData} />
      
            <BlogSection id="blog">
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('blog.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('blog.subtitle')}
          </motion.p>
        </SectionHeader>

        {error && (
          <ErrorMessage>
            <span className="icon">⚠️</span>
            {error}
          </ErrorMessage>
        )}

        <BlogControls>
          <SearchBar>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search articles"
            />
          </SearchBar>

          <FilterButtons>
            {categories.map(category => (
              <FilterButton
                key={category.key}
                active={categoryFilter === category.key}
                onClick={() => setCategoryFilter(category.key)}
                aria-label={`Filter by ${category.label}`}
              >
                {category.label}
              </FilterButton>
            ))}
          </FilterButtons>
        </BlogControls>

        {loading && (
          <LoadingSpinner>
            <div className="spinner"></div>
            Loading articles...
          </LoadingSpinner>
        )}

        {!loading && (
          <>
            <BlogGrid>
              {articles.map((article, index) => (
                <BlogCard
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogHeader onClick={() => handleToggleArticle(article.id)}>
                    <span className="category">{article.category}</span>
                    <h3>{article.title[currentLang] || article.title.en}</h3>
                    <p>{article.excerpt[currentLang] || article.excerpt.en}</p>
                    <div className="meta">
                      <span className="reading-time">
                        📖 {article.readTime} min read
                      </span>
                      <span>📅 {new Date(article.publishedAt).toLocaleDateString()}</span>
                      {article.author && <span>👨‍⚕️ {article.author.name}</span>}
                    </div>
                    <ExpandButton
                      className={expandedArticles.has(article.id) ? 'expanded' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleArticle(article.id);
                      }}
                      aria-expanded={expandedArticles.has(article.id)}
                      aria-label={`${expandedArticles.has(article.id) ? 'Collapse' : 'Expand'} article`}
                    >
                      {expandedArticles.has(article.id) ? t('blog.readLess') : t('blog.readMore')}
                      <span className="arrow">⌄</span>
                    </ExpandButton>
                  </BlogHeader>

                  <AnimatePresence>
                    {expandedArticles.has(article.id) && (
                      <BlogContent
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="content-text">
                          {(() => {
                            const loadedArticle = loadedArticles.get(article.id);
                            if (loadedArticle && loadedArticle.content) {
                              return <ReactMarkdown>{loadedArticle.content[currentLang] || loadedArticle.content.en}</ReactMarkdown>;
                            }
                            return <div>Loading content...</div>;
                          })()}
                        </div>
                      </BlogContent>
                    )}
                  </AnimatePresence>
                </BlogCard>
              ))}
            </BlogGrid>

            {articles.length === 0 && !loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--space-16)', 
                color: 'var(--color-gray-600)',
                fontSize: 'var(--font-size-lg)'
              }}>
                No articles found matching your search criteria.
              </div>
            )}

            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationInfo>
                  Showing {startIndex + 1}-{endIndex} of {total} articles
                </PaginationInfo>
                {renderPaginationButtons()}
              </PaginationContainer>
            )}
          </>
        )}
      </Container>
    </BlogSection>
    </>
  );
};

export default Blog;