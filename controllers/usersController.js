const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
const passport = require('passport')
require('../lib/passport')


module.exports={

   getAllUsers: (req,res) => {
      User.find({}).then((users) => {
         return res.status(200).json({message: 'Success', users})
      }).catch(err=>res.status(500).json({message:'Errrrror', err}))
   },
   
   renderLogin: (req,res) => {
      return res.render('users/login')
   },

   renderRegister: (req,res) => {
      return res.render('users/register')
   },

   renderProfile: (req,res) => {
      return res.render('users/profile')
   },
   
   
   postRegister: (req,res) => {
      User.findOne({email: req.body.email}).then((user) => {
         if(user) {
            return res.status(400).json({message: 'This email already registered.'})
         }

         const newUser = new User()
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(req.body.password, salt);
         newUser.name = req.body.name
         newUser.email = req.body.email
         newUser.password = hash

         newUser.save().then((user) => {
            return req.login(user, (err) => {
            if(err) return res.status(500).json({message:'Server error Yo!', err})
            console.log(req.session)
            return res.redirect('/movies')
            })
         }).catch(err=> res.status(400).json({message: 'Server error on saving in database',err}))
      }).catch(err=> res.status(418).json({message: 'Server Error on register',err}))
   },
   
   userUpdate: (req,res) => {
      User.findOne({_id: req.user._id}).then((user) => {
         user.name = req.body.name ? req.body.name : user.name
         user.email = req.body.email ? req.body.email : user.email

         if(req.body.oldPass && req.body.newPass && req.body.newPassRepeat){

            bcrypt.compare(req.body.oldPass, user.password).then(result=>{
               if(!result) return res.send('Old password doesn\'t match')
               if(req.body.newPass !== req.body.newPassRepeat) return res.send('Repeat password doesn\'t match')

               const salt = bcrypt.genSaltSync(10);
               const hash = bcrypt.hashSync(req.body.newPass, salt);

               user.password = hash
               user.save().then(user=>{
                  return res.status(200).json({message:'User updated'})
               }).catch(err=>res.status(410).json({message: 'Couldn\'t save'}))
            }).catch(err=> res.status(500).json({message:'Server errror', err}))
         }
         

         user.save().then(user=>{
            return res.status(200).json({message:'User updated'})
         }).catch(err=>res.status(418).json({message: 'Couldn\'t save2'}))
      }).catch(err=> res.status(500).json({message: 'Server Errrorrrr'}))
   },

   login: passport.authenticate('local-login', {
      successRedirect: '/movies',
      failureRedirect: '/users/login',
   }),
   
   logout: (req,res) => {
      req.session.destroy()
      req.logout()
      return res.redirect('/')
   },
   
}