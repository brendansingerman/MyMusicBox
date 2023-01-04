import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveArtistIds, getSavedArtistIds } from '../utils/localStorage';
// import Apollo hook and mutation
import { LIKE_ARTIST } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

require('dotenv').config();
const apiKey = process.env.REACT_APP_APIKEY;


const SearchArtists = () => {
  // create state for holding returned genius api data
  const [searchedArtists, setSearchedArtists] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved artistId values
  const [savedArtistIds, setSavedArtistIds] = useState(getSavedArtistIds());
  // set up useEffect hook to save `savedArtistIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveArtistIds(savedArtistIds);
  });

  // use the LIKE_ARTIST mutation
  const [likeArtist] = useMutation(LIKE_ARTIST);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
     
      const response = await fetch(
        `https://api.genius.com/search?q=${searchInput}&access_token=${apiKey}`
      )
        

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { ...meta } = await response.json();
      //testing
      console.log(meta);

      // info from genius API
      const artistData = meta.response.hits.map((artist) => ({
        artistId: artist.result.id,
        name: artist.result.artist_names,
        song: artist.result.title,
        year: artist.result.release_date_components.year,
        sample: artist.result.url,
        image: artist.result.header_image_thumbnail_url || "",

      }));

      setSearchedArtists(artistData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle liking an artist to our database
  const handleLikeArtist = async (artistId) => {
    // find the song in `searchedArtists` state by the matching id
    const artistToLike = searchedArtists.find((artist) => artist.artistId === artistId);
    
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await likeArtist({
        variables: {
          input: artistToLike,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if artist successfully saves to user's account, save artist id to state
      setSavedArtistIds([...savedArtistIds, artistToLike.artistId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="py-8 px-4 md:py-16 md:px-8 mb-8 bg-gray-200 rounded pr-0 pl-0 rounded-none backGround-color text-light">
        <div className='container mx-auto sm:px-4'>
          <h1 className='text-4xl'>Search for Music!</h1>
          <form className='mb-4 flex flex-wrap' onSubmit={handleFormSubmit}>
              <div className='relative flex-grow max-w-full flex-1'>
                <input className='w-full rounded-lg h-full px-3 text-dark'
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search an artist"
                />
              </div>
              <div className='relative flex-grow max-w-full flex-1 px-4'>
                <button className='inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-green-500 text-white hover:green-600 py-3 px-4 leading-tight text-xl' type="submit" variant="success" size="lg">
                  Submit Search
                </button>
              </div>
          </form>
        </div>
      </div>

      <div className='container mx-auto sm:px-4'>
        <h2>
       
          {searchedArtists
          .length
            ? `Viewing top ${searchedArtists.length} results:`
            : "Search for an artist to begin"}
          
        </h2>
        <CardColumns>
          {searchedArtists.map((artist) => {
            return (
              <Card key={artist.artistId} border="dark">
                {artist.image ? (
                  <Card.Img
                    src={artist.image}
                    alt={`The image for ${artist}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <Card.Text>{artist.song}</Card.Text>
                  <Card.Text>{artist.year}</Card.Text>
                  <p className="small"><a href={artist.sample} target="_blank" rel="noreferrer">See lyrics on Genius</a></p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedArtistIds?.some(
                        (savedArtistId) => savedArtistId === artist.artistId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleLikeArtist(artist.artistId)}
                    >
                      {savedArtistIds?.some(
                        (savedArtistId) => savedArtistId === artist.artistId
                      )
                        ? "Song liked!"
                        : "Like this Song!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </>c
  );
};

export default SearchArtists;
