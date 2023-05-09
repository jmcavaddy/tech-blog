const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
    try {
      res.render('homepage', { 

      });
    } catch (err) {
      res.status(500).json(err);
    }   
});

// GET Login Page
router.get('/login', (req, res) => {

    res.render('login');
});

// GET Signup Page
router.get('/signup', (req, res) => {

    res.render('signup');
});
   
// GET user's info for dashboard
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET newPost page
router.get('/newPost', withAuth, async (req, res) => {
  try {
    res.render('newPost', {
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;