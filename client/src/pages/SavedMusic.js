import React from 'react';
// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
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
      {/* Jumbotron from bootstrap to tailwind */}
      <div className="py-8 px-4 md:py-16 md:px-8 mb-8 bg-gray-200 pr-0 pl-0 rounded-none backGround-color text-light">
        {/* Container from bootstrap to tailwind */}
        <div className='container mx-auto sm:px-4'>
          <h1>Viewing {userData.username}'s artists!</h1>
        </div>
      </div>
      {/* Container from bootstrap to tailwind */}
      <div className='container mx-auto sm:px-4'>
        <h2>
          {userData.likedArtists?.length
            ? `Viewing ${userData.likedArtists.length} saved ${
                userData.likedArtists.length === 1 ? 'artist' : 'artists'
              }:`
            : 'You have no liked music!'}
        </h2>
        {/* CardColumns from bootstrap to tailwind */}
        <div className='flex flex-wrap'>
          {/* Card Col from bootstrap to tailwind */}
          <div className='flex flex-wrap flex-row pr-4 pl-4'>
            {userData.likedArtists?.map((artist) => {
              return (
                // Card from bootstrap to tailwind
                <div className='relative flex flex-col min-w-0 rounded break-words border backGround-color text-white border-1 border-gray-300 py-3 px-3' key={artist.artistId}>
                  {artist.image ? (
                    // Card.Img from bootstrap to tailwind
                    <img className='max-w-full h-auto' 
                    src={artist.image} 
                    alt={` ${artist.name}`} 
                    variant='top'> 
                    </img>
                  ) : null}
                  {/* Card.Body from bootstrap to tailwind */}
                  <div className='flex-auto p-6'>
                    {/* Card.Title from bootstrap to tailwind */}
                    <div className='mb-3'>{artist.name}</div>
                    <p className='small'>{artist.song}</p>
                    {/* Card.Text from bootstrap to tailwind */}
                    <div className='mb-0'>{artist.year}</div>
                    {/* Button from bootstrap to tailwind */}
                    <button
                      className='inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline bg-red-500 text-white hover:green-600 py-3 px-4 leading-tight text-xl'
                      onClick={() => handleDeleteArtist(artist.artistId)}>
                      Remove this Song!
                    </button>
                    {error && <span className="ml-2">Something went wrong...</span>}
                    {/* Button from bootstrap to tailwind and I left the className */}
                    <button
                    className='btn-block'>comment</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedArtists;