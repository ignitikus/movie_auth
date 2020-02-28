const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies')

const {
  getMain,
  getAddMovie,
  getUpdateMovie,
  getFavorites,
  removeFromFav,
  findMovie,
  findByGenre,
  addMovie,
  updateMovie,
  addToFav,
  deleteMovie,
} = require('../controllers/movieController')

const {
  loginValidation
} = require('../controllers/validators/validator')

const {
  logout
} = require('../controllers/usersController')

router.get('/', loginValidation, getMain);
router.get('/getmovie', loginValidation, findMovie)
router.get('/addmovie', loginValidation, getAddMovie)
router.get('/favorites', loginValidation, getFavorites)
router.get('/updatemovie', loginValidation, getUpdateMovie)
router.get('/filteredbygenre', loginValidation, findByGenre)
router.get('/logout', logout)

router.post('/addmovie', addMovie)
router.put('/updatemovie/:title', updateMovie)
router.put('/addtofavorites/:title', addToFav)
router.put('/favorites/:title', removeFromFav)
router.delete('/deletemovie/:title', deleteMovie)

module.exports = router;
