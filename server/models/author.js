const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema( {
    name: String,
    age : Number,
    id  : Number
} );

const Author = mongoose.model( 'Author', AuthorSchema );
module.exports = Author;