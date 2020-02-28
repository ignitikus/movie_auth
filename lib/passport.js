const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/Users')
const bcrypt = require('bcryptjs')

//* this places the mongo user id into passport sessions
passport.serializeUser((user, done) => {
   done(null, user._id)
})

//* this gives us our req.user to use throughout the app
passport.deserializeUser((id,done) => {
   User.findById(id, (err, user) => {
      done(err, user)
   })
})

//* create login middleware
passport.use('local-login', new LocalStrategy({
   //* usernameField defaults to name. these fields are expected 
   usernameField:'email',
   passwordField:'password',
   passReqToCallback: true
}, (req, email, password, done) => {
   User.findOne({email:req.body.email}, (err, user) => {
      if(err){
         console.log('Login error: ', err)
         return done(err, null)
      } 
      if(!user) {
         console.log('No user found')
         return done(null, false)
      }
      
      bcrypt.compare(password, user.password).then(result => {
         if(!result) return done(null, false)
         return done(null, user)
      }).catch((err) => {
         throw err
      })
   })
}))
