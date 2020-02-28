module.exports = {
   myValidation: (req,res,next) => {
      if(!req.body.name || !req.body.email || !req.body.password) return res.status(403).json({message: 'All inputs must be filled.'})
      next()
   },

   loginValidation: (req,res, next) => {
      if(!req.isAuthenticated()) return res.redirect('/403')
      next()
   }
} 