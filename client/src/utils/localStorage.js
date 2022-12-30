export const getSavedArtistIds = () => {
    const savedArtistIds = localStorage.getItem('saved_artist')
      ? JSON.parse(localStorage.getItem('saved_artist'))
      : [];
  
    return savedArtistIds;
  };
  
  export const saveArtistIds = (artistIdArr) => {
    if (artistIdArr.length) {
      localStorage.setItem('saved_artists', JSON.stringify(artistIdArr));
    } else {
      localStorage.removeItem('saved_artists');
    }
  };
  
  export const removeArtistId = (artistId) => {
    const savedArtistIds = localStorage.getItem('saved_artists')
      ? JSON.parse(localStorage.getItem('saved_artists'))
      : null;
  
    if (!savedArtistIds) {
      return false;
    }
  
    const updatedSavedArtistIds = savedArtistIds?.filter((savedArtistId) => savedArtistId !== artistId);
    localStorage.setItem('saved_artists', JSON.stringify(updatedSavedArtistIds));
  
    return true;
  };