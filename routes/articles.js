const express = require('express');
const router = express.Router();
const Articles = require('../models/Articles')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/new', ensureAuthenticated, (req, res) =>
  res.render('new', {
    user: req.user
  })
);


router.post('/',ensureAuthenticated,  (req, res)=>{
    let  {title, description} = req.body;
    let article = new Articles({
        title,
        description
    })
    try {
         article.save();
          res.redirect(`/articles/${article.id}`);
    } catch (error) {
        res.render('articles/new', {article: article})
    }
})
const articles = [ {
    title: 'test articles',
    dateNTime: Date.now(),
    description: 'this s the discruotion'
}]
router.get('/allpost', ensureAuthenticated, async (req, res) => {
    const articles = await  Articles.find().sort({dateNTime: 'desc'})
    res.render('allpost', {articles : articles})
  });

router.get('/:id', ensureAuthenticated,async (req, res)=>{

    const article = await Articles.findById(req.params.id)
    try {
        res.render('show', {article: article})
    } catch (error) {
        console.log("updated person info  failes", error)
    }

})


router.get('/edit/:id', async (req, res)=>{
   try {
    const article = await Articles.findById(req.params.id)
    res.render('articles/edit', {article: article})
   } catch (error) {
       console.log(error)
   }
   })




router.delete('/:_id', async (req, res)=>{
 
 await Articles.findByIdAndDelete(req.params._id)
    try {
        res.redirect('/')
    } catch (error) {
        console.log("Delete faile", error)
    }
    })

    // router.put('/:id', async (req, res)=>{
    //     const {_id} = req.params;
    //     const updated = await (Person.findByIdAndUpdate({_id},{$set: req.body}))
    //     try {
    //         res.send(updated)
    //     } catch (error) {
    //         console.log("updated person info  failes", error)
    //     }
    //     })
    

module.exports = router;