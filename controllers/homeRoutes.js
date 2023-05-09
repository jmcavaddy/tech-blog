const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('homepage', { 

      });
    } catch (err) {
      res.status(500).json(err);
    }   
});

router.get('/login', (req, res) => {

    res.render('login');
});

router.get('/signup', (req, res) => {

    res.render('signup');
});
    
router.get('/dashboard', (req, res) => {

    res.render('dashboard');
});

module.exports = router;