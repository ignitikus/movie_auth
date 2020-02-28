const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name:{type: String, default: '', trim: true},
   email:{type: String, default: '', unique: true, trim:true, lowercase:true},
   password:{type: String, default: '', trim: true},
   favorites:{type: [], default:[]}
})

module.exports = mongoose.model('User', UserSchema)