/**
 * book controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::book.book');


// src/api/book/controllers/book.js

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book', ({ strapi }) => ({

  async shareWithUser(ctx) {
    const { id: bookId } = ctx.params;
    const { userId } = ctx.request.body;

    if (!bookId || !userId) {
      return ctx.badRequest('Missing bookId or userId');
    }

    // Get the existing book
    const existingBook = await strapi.entityService.findOne('api::book.book', bookId, {
      populate: ['sharedWithUsers'],
    });

    if (!existingBook) {
      return ctx.notFound('Book not found');
    }

    // Check if user is already shared
    const alreadyShared = existingBook.sharedWithUsers.some(user => user.id === userId);
    if (alreadyShared) {
      return ctx.badRequest('User already shared');
    }

    // Append the new user
    const updatedUserList = [...existingBook.sharedWithUsers.map(u => u.id), userId];

    const updatedBook = await strapi.entityService.update('api::book.book', bookId, {
      data: {
        sharedWithUsers: updatedUserList,
      },
    });

    ctx.send({ message: 'Book shared successfully', book: updatedBook });
  }

}));
