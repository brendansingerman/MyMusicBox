import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LIKE_ARTIST = gql`
  mutation likeArtist($input: ArtistInput) {
    likeArtist(input: $input) {
      _id
      username
      artistCount
      likedArtists {
        artistId
        name
        song
        year
        sample
        image
      }
    }
  }
`;

export const REMOVE_ARTIST = gql`
  mutation removeArtist($artistId: Int) {
    removeArtist(artistId: $artistId) {
      _id
      username
      artistCount
      likedArtists {
        artistId
        name
        song
        year
        sample
        image
      }
    }
  }
`;