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
    artistId: String!
    image: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input ArtistInput {
    artistId: String!
    image: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likeArtist(input: ArtistInput): User
    removeArtist(artistId: String!): User
  }
`;

module.exports = typeDefs;