const Author     = require('../models/author');
const Book       = require('../models/book');
const { AuthorType, BookType } = require('./schema');
const mutation = require('./mutations');
const {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');


const RootQuery = new GraphQLObjectType( {
    name: 'RootQuery', 
    fields: {
        book: {
            type: BookType,
            args: { 
                id: {
                    type: GraphQLID
                }
            },
            resolve( parent, { id } ) {
                // return User.findById(id)
                return Book.findOne( { id } )
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve( parent, args ) {
                return Book.find( {} );
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve( parent, { id } ) {
                return Author.findOne( { id } );
            }
        },
        authors: { 
            type: new GraphQLList(AuthorType),
            resolve( parent, args ) {
                return Author.find( { } );
            }
        }
    }
} );


module.exports = new GraphQLSchema( {
    query: RootQuery,
    mutation
} );