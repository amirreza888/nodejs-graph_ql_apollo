const { gql } = require('apollo-server-express');
const Movie = require('./models/movie');


const typeDefs = gql `
   type Movie {
     id: ID!
     name: String!
     producer: String!
     rating: Float!
   }
   type Query {
     getMovies: [Movie]
     getMovie(id: ID!): Movie
   }
   type Mutation {
     addMovie(name: String!, producer: String!, rating: Float!): Movie
     updateMovie(name: String!, producer: String!, rating: Float): Movie
     deleteMovie(id: ID!): Movie
   }
`



const resolvers = {
    Query: {
        getMovies: (parent, args) => {
            return Movie.find({});
        },
        getMovie: (parent, args) => {
            return Movie.findById(args.id);
        }
    },
    Mutation: {
        addMovie:  async (parent, args) => {
            const movie = await Movie.create({
                name: args.name,
                producer: args.producer,
                rating: args.rating,
            });
            return movie;
        },
        updateMovie: (parent, args) => {
            if (!args.id) return;
            return Movie.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        name: args.name,
                        producer: args.producer,
                        rating: args.rating,
                    }
                }, {new: true}, (err, Movie) => {
                    if (err) {
                        console.log('Something went wrong when updating the movie');
                    } else {
                    }
                }
            );
        }
    }
}

module.exports = {typeDefs, resolvers};