const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../lib/passport')

const {
   getAllUsers,
   renderLogin,
   renderRegister,
   renderProfile,
   postRegister,
   userUpdate,
   login,
   logout

} = require('../controllers/usersController')

const {
   myValidation,
   loginValidation
} = require('../controllers/validators/validator')

router.get('/',loginValidation ,getAllUsers)
router.get('/login', renderLogin)
router.get('/register', renderRegister)
router.get('/profile', loginValidation, renderProfile)
router.get('/logout', logout)

router.post('/login', login)
router.post('/register', myValidation, postRegister)

router.put('/update', userUpdate)



module.exports = router;
