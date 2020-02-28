const express = require('express');
const router = express.Router();




router.get('/', (req,res) => {
   return res.render('index', {title: 'Main'})
});

router.get('/403', (req,res) => {
   return res.render('403')
})

module.exports = router;
