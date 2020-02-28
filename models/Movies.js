const mongoose = require('mongoose')


const MovieSchema = new mongoose.Schema({
   title:{type: String, default:'', lowercase: true, trim:true, unique: true},
   rating:{type: String, default:''},
   synopsis:{type: String, default:''},
   release_year:{type: String, default: ''},
   genre:{type: [], default: []},
   director:{type: String, default:''},
   box_office:{type: String, default: ''},
   poster:{type: String, default: ''}
})

module.exports = mongoose.model('Movie', MovieSchema)