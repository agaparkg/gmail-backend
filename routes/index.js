var express = require('express');
var router = express.Router();
var { primary, social, promotions, allInbox } = require('../fake-db');

// I KNOW CODE IS REPEATED AND NOT GREAT. THATS A TASK FOR LATER TO OTHER ENGINEERS.
// front end engineers can look and see if there is a 'next' or 'previous'.
// Based on that disable/enable the pagination buttons

const limit = 50;

// endpoint for category
router.get('/api', customMiddleware(), (req, res) => {
  res.json(res.paginatedResults);
});

// endpoint for tags
router.get('/api/tags', tagsMiddleware(), (req, res) => {
  res.json(res.paginatedResults);
});

function customMiddleware() {
  return async (req, res, next) => {
    const category = req.query.category;
    const page = parseInt(req.query.page);

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (category === 'primary') {
      if (endIndex < primary.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = primary.length;
      results.items = primary.slice(startIndex, endIndex);
      res.paginatedResults = results;
      console.log('primary');
      next();
    } else if (category === 'social') {
      if (endIndex < social.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = social.length;
      results.items = social.slice(startIndex, endIndex);

      res.paginatedResults = results;
      console.log('social');
      next();
    } else if (category === 'promotions') {
      if (endIndex < promotions.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = promotions.length;
      results.items = promotions.slice(startIndex, endIndex);
      res.paginatedResults = results;
      console.log('promotions');
      next();
    } else {
      res.paginatedResults = { message: 'Not data found!' };
    }
  };
}

function tagsMiddleware() {
  return async (req, res, next) => {
    const tags = req.query.tags;
    const page = parseInt(req.query.page);

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (tags === 'starred') {
      const starredEmails = allInbox.filter(
        (email) => email.tags.isStarred === true
      );

      if (endIndex < starredEmails.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = starredEmails.length;
      results.items = starredEmails.slice(startIndex, endIndex);
      res.paginatedResults = results;
      console.log('STARRED');
      next();
    } else if (tags === 'trash') {
      const trashEmails = allInbox.filter(
        (email) => email.tags.isTrash === true
      );

      if (endIndex < trashEmails.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = trashEmails.length;
      results.items = trashEmails.slice(startIndex, endIndex);
      res.paginatedResults = results;
      console.log('TRASH');
      next();
    } else if (tags === 'spam') {
      const spamEmails = allInbox.filter((email) => email.tags.isSpam === true);

      if (endIndex < spamEmails.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = spamEmails.length;
      results.items = spamEmails.slice(startIndex, endIndex);
      res.paginatedResults = results;
      console.log('SPAM');
      next();
    } else {
      res.paginatedResults = { message: 'Not data found!' };
    }
  };
}

module.exports = router;
