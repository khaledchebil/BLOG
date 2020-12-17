const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Articles = require('../models/Articles')


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);


// router.get('/singlepost', ensureAuthenticated, (req, res) =>

//   res.render('singlepost', {articles : articles})
// );

// router.get('/singlepost',ensureAuthenticated,async (req,res)=>{
//   const articles = await  Articles.find().sort({dateNTime: 'desc'})
//   res.render('/singlepost', {articles : articles})
//   })

module.exports = router;
