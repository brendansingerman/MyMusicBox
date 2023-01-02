import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_ARTIST } from '../utils/mutations';
import { removeArtistId } from '../utils/localStorage';
import Auth from '../utils/auth';

const SavedArtists = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeArtist, { error }] = useMutation(REMOVE_ARTIST);

  const userData = data?.me || {};

  // create function that accepts the artist's _id value as param and deletes the artist from the database
  const handleDeleteArtist = async (artistId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeArtist({
        variables: { artistId },
      });

      // upon success, remove artist's id from localStorage
      removeArtistId(artistId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userData.username}'s artists!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.likedArtists?.length
            ? `Viewing ${userData.likedArtists.length} saved ${
                userData.likedArtists.length === 1 ? 'artist' : 'artists'
              }:`
            : 'You have no liked music!'}
        </h2>
        <CardColumns>
          {userData.likedArtists?.map((artist) => {
            return (
              <Card key={artist.artistId} border='dark'>
                {artist.image ? (
                  <Card.Img src={artist.image} alt={`The name for ${artist.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <p className='small'>{artist.song}</p>
                  <Card.Text>{artist.year}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteArtist(artist.artistId)}>
                    Remove this Song!
                  </Button>
                  {error && <span className="ml-2">Something went wrong...</span>}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedArtists;

