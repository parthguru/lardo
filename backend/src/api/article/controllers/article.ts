/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    // Add default population for relations
    const populatedArticles = await strapi.entityService.findMany('api::article.article', {
      ...query,
      populate: {
        category: true,
        author: true,
        tags: true,
      },
    });

    return populatedArticles;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const populatedArticle = await strapi.entityService.findOne('api::article.article', id, {
      ...query,
      populate: {
        category: true,
        author: true,
        tags: true,
      },
    });

    return populatedArticle;
  },
}));