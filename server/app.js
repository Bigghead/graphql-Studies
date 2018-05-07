const express        = require('express');
const expressGraphQL = require('express-graphql');
const mongoose       = require('mongoose');
const Author         = require('./models/author');
const Book           = require('./models/book');
const RootQuery      = require('./graphql/rootQuery');

const app            = express();


mongoose.connect('mongodb://bigghead:hello@ds217350.mlab.com:17350/graphql-tuts');


const books = [
    { id: '1' , name: 'hello', genre: 'Meep', authorId: '1' },
    { id: '2' , name: 'hi', genre: 'yo', authorId: '2' },
    { id: '3' , name: 'Meep Meep', genre: 'Meepyo', authorId: '3' },
    { id: '4' , name: 'New Book', genre: 'Meepyo', authorId: '2' },
    { id: '5' , name: 'Another Book', genre: 'Meepyo', authorId: '4' },
    
];

const authors = [
    { id: '1', name: 'Terry', age: 44 },
    { id: '2', name: 'Patrick', age: 67 },
    { id: '3', name: 'Matt', age: 22 }    
]

const seedDB = async() => {
    
    try {

        await Promise.all( books.map( book => {
            const { id, name, genre, authorId } = book;
            Book.create( { id, name, genre, authorId } );
        } ) );

        await Promise.all( authors.map( a => {
            const { id, name, age } = a;
            Author.create( { id, name, age } );
        } ) )

    } catch ( err ) {
        console.log( err );
    }
};

// seedDB()


app.use( '/graphql', expressGraphQL( {
    schema : RootQuery,
    graphiql: true
} ) )

app.get( '/', ( req, res ) => {
    res.send('hi')
} )

app.listen(9000)