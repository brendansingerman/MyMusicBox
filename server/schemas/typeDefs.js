const { gql } = require("apollo-server-express");

// ！means that the field is non-nullable.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    artistCount: Int
    likedArtists: [Artist]
  }
  type Artist {
    artistId: Int
    name: String
    song: String
    year: Int
    sample: String
    image: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input ArtistInput {
    artistId: Int
    name: String
    song: String
    year: Int
    sample: String
    image: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likeArtist(input: ArtistInput): User
    removeArtist(artistId: Int): User
  }
`;

module.exports = typeDefs;