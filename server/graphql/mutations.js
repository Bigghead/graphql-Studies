const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const { AuthorType, BookType } = require('./schema');
const Author = require('../models/author');
const Book   = require('../models/book');


const Mutations = new GraphQLObjectType( {
    name: 'Mutations',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: GraphQLString },
                age : { type: GraphQLInt },
                id  : { type: GraphQLInt }                
            },
            resolve( parent, { name, age, id } ) {
                return Author.create( { name, age, id } );
            }
        },
        addBook: {
            type: BookType,
            args: {
                name    : { type: GraphQLString },
                genre   : { type: GraphQLString },
                id      : { type: GraphQLInt },
                authorId: { type: GraphQLInt}
            },
            resolve( parent, { name, genre, id, authorId } ) {
                return Book.create( { name, genre, id, authorId } );
            }
        }
    }
} );


module.exports = Mutations;