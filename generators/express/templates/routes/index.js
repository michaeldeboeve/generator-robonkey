var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    lang: 'en',
    title: 'Title',
    description: 'Description',
    useTwitterMetaTags: false,
    useFacebookMetaTags: true,
    socialURL: 'url',
    twitterCard: 'summary',
    twitterHandler: '@somebody',
    twitterTitle: 'Twittert Title',
    twitterDescription: 'Twitter Description',
    twitterImage: 'imgpath',
    facebookType: 'website',
    facebookTitle: 'Facebook Title',
    facebookDescription: 'Facebook Description',
    facebookImage: 'imgpath',
    useTouchIcons: true
  });
});

module.exports = router;
