const express = require('express');
const router = express.Router();

const Movie = require('../models/Movies')

const {
  getMain,
  getAddMovie,
  getUpdateMovie,
  findMovie,
  findByGenre,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController')

const {
  logout
} = require('../controllers/usersController')

router.get('/', getMain);
router.get('/getmovie', findMovie)
router.get('/filteredbygenre', findByGenre)
router.get('/addmovie', getAddMovie)
router.get('/updatemovie', getUpdateMovie)
router.get('/logout', logout)

router.post('/addmovie', addMovie)
router.put('/updatemovie/:title', updateMovie)
router.delete('/deletemovie/:title', deleteMovie)

module.exports = router;
