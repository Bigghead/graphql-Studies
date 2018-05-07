const mongoose = require('mongoose');


const BookSchema = mongoose.Schema( {
    id   : Number,
    name : String,
    genre: String,
    authorId: Number
} );

module.exports = mongoose.model( 'Book', BookSchema );