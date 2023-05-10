const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
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
   
// GET user's info and posts for dashboard
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
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

// GET editPost page
router.get('/editPost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
    }

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;