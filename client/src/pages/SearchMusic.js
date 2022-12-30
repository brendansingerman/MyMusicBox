import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveArtistIds, getSavedArtistIds } from '../utils/localStorage';
// import Apollo hook and mutation
import { LIKE_ARTIST } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

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
        // genius api here 
        `api.genius.com/search?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();


      // info from genius API
      const artistData = items.map((artist) => ({
        artistId: artist.id,
        name: artist_names,
        image: header_image_thumbnail_url || "",
      }));

      setSearchedArtists(artistData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle liking an artist to our database
  const handleLikeArtist = async (artistId) => {
    // find the book in `searchedArtists` state by the matching id
    const artistToLike = searchedArtists.find((artist) => artist.artistId === artistId);

    // get token
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
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Music!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search an artist"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedArtists
          .length
            ? `Viewing ${searchedArtists.length} results:`
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
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedArtistIds?.some(
                        (savedArtistId) => savedArtistId === artist.artistId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(artist.artistId)}
                    >
                      {savedArtistIds?.some(
                        (savedArtistId) => savedArtistId === artist.artistId
                      )
                        ? "This artist has already been liked!"
                        : "Like this Artist!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchArtists;
