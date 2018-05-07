const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = require('graphql');


const Author = require('../models/author');
const Book   = require('../models/book');


const BookType = new GraphQLObjectType( {
    name: 'Book',
    fields: () => ( {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve( parent, args) {
                return Author.findOne( { id: parent.authorId } );
            }
        }
    } )
} );

const AuthorType = new GraphQLObjectType( {
    name: 'Author',
    fields: () => ( {
        id   : { type: GraphQLID },
        name : { type: GraphQLString },
        age  : { type: GraphQLInt },
        books: { 
            type: new GraphQLList(BookType),
            resolve( parent, args ) {
                return Book.find( { authorId: parent.id } );
            }
        }
    } )
} );



module.exports = {
    BookType,
    AuthorType
}