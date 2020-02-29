const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies')
const User = require('../models/Users')

module.exports ={
   getMain: (req, res, next)=>{
      Movie.find({}).then((movies) => {
         return res.render('movies/index', {title:'Movies', movies})
      }).catch(err=>res.status(400).json({message:'Oops! Something went wrong'}))
   },

   getAddMovie: (req,res) => {
      return res.render('movies/addmovie', {title: 'Add a movie'})
   },

   getUpdateMovie: (req,res) => {
      const movieTitle = req.headers.referer.split('=')[1]
      Movie.findOne({title: {$regex: movieTitle, $options: 'i'}}).then(movie=>{
      if(movie) return res.render('movies/updateMovie', {title:'Found Movie', movie})
      return res.status(400).json({message: 'Movie not found'})
      }).catch(err=>
         res.status(500).json({message:'Server Error'}))
   },

   getFavorites: (req,res) => {
      if(req.user.favorites.length<1) return res.render('movies/favorites')
      Movie.find({title: {$in:req.user.favorites}}).then(movies=>{
         return res.render('movies/favorites', {movies})
      }).catch(err=> res.status(500).json({message: 'Something', err}))
      
   },

   findMovie: (req,res) => {
      if(!req.query.movie)return 
      Movie.find({title: {$regex: req.query.movie, $options: 'i'}}).then(movies=>{
         console.log(movies)
         if(movies.length>0) return res.render('movies/foundMovie', {title:'Found Movie', movies})
         return res.status(400).json({message: 'Movie not found'})
      }).catch(error=>
         res.status(500).json({message:'Server Error', error}))
   },

   findByGenre: (req,res) => {
      Movie.find({genre:req.query.genre}).then(movies=>{
         console.log(movies)
         if(movies.length>0) return res.render('movies/genreonly', {title:'Found Genre',genre:req.query.genre, movies})
         return res.status(400).json({message: `No movies found`})
      })
   },

   addMovie: (req,res) => {
      if (!req.body.title 
            || !req.body.rating 
            || !req.body.synopsis
            || !req.body.release_year
            || !req.body.genre
            || !req.body.director
            || !req.body.box_office
            || !req.body.poster) {
         return res.status(400).json({ message: 'All inputs must be filled' });
      }
      Movie.findOne({title: req.body.title}).then((movie) => {
         if(movie) return res.status(500).json({message:'Movie already in database'})

         const newMovie = new Movie()
         newMovie.title = req.body.title
         newMovie.rating = req.body.rating
         newMovie.synopsis = req.body.synopsis
         newMovie.release_year = req.body.release_year
         newMovie.genre = req.body.genre.toLowerCase().split(' ').join('').split(',')
         newMovie.director = req.body.director
         newMovie.box_office = req.body.box_office
         newMovie.poster = req.body.poster

         newMovie.save()
            .then(movie => {
               return res.status(200).json({ message: 'Movie added', movie: movie.title });
            }).catch(err => {
               return res
                  .status(500)
                  .json({ message: 'Movie wasn\'t added.', err });
            })
      }).catch(err => res.status(400).json({message:'Oops! Server error. Couldn\'t add movie'}))
   },

   addToFav: (req,res) => {
      console.log(req.params.title)
      User.findOne({email: req.user.email}).then((user) => {
         if(user.favorites.includes(req.params.title)) return res.redirect('/movies')
         user.favorites.push(req.params.title)
         user.save().then((user) => {
            return res.redirect('/movies')
         }).catch(err=>res.status(500).json({message:'Error on saving',err}))
      }).catch(err=>res.status(500).json({message:"Error on DB access", err}))
   },

   removeFromFav: (req,res) => {
      User.findOne({email: req.user.email}).then(user=>{
         user.favorites = user.favorites.reduce((array, movie) => {
            if(movie !== req.params.title){
               array.push(movie)
            } 
            return array
         },[])
         user.save().then((user) => {
            return res.redirect('/movies/favorites')
         }
         ).catch(err=>res.status(500).json({message:'Error saving favorites', err}))
      }).catch(err=> res.status(502).json('Having issues on the server'))
   },

   updateMovie: (req,res)=>{
      Movie.findOne({title:req.params.title}).then(movie=>{
         if(movie===null){
            return res.status(200).json({message:"Movie not found"})
         }
            movie.rating = req.body.rating ? req.body.rating : movie.rating,
            movie.synopsis = req.body.synopsis ? req.body.synopsis : movie.synopsis,
            movie.release_year = req.body.release_year ? req.body.release_year : movie.release_year,
            movie.genre = req.body.genre ? req.body.genre.toLowerCase().split(' ').join('').split(',') : movie.genre.toLowerCase().split(' ').join('').split(','),
            movie.director = req.body.director ? req.body.director : movie.director,
            movie.box_office = req.body.box_office ? req.body.box_office : movie.box_office,
            movie.poster = req.body.poster ? req.body.poster : movie.poster
            movie.save()
            res.redirect('/movies')
      }).catch(err=>res.status(400).json({message:'Oops! Something went wrong'}))
   },
   
   deleteMovie: (req,res) => {
      Movie.findOneAndDelete({title:req.params.title}).then(deleted=>{
         if(deleted===null)return res.status(400).json({message:"Movie not found"})
         res.status(200).json({message:`Movie ${deleted.title} deleted from database`})
      }).catch(err=> res.status(400).json({message:'Server error'}))
   }
}