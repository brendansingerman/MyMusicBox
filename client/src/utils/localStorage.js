export const getSavedMusicIds = () => {
    const getSavedMusicIds = localStorage.getItem('saved_music')
    ? JSON.parse(localStorage.getItem('saved_music'))
    : [];

    return getSavedMusicIds
};

export const saveMusicIds = (musicIdArr) => {
    if (musicIdArr.length) {
        localStorage.setItem('saved_music', JSON.stringify(musicIdArr));
    } else {
        localStorage.removeItem('saved_music')
    }
};

export const removeMusicId = (musicId) => {
    const savedMusicIds = localStorage.setItem('saved_music')
    ? JSON.parse(localStorage.getItem('saved_music'))
    : null;

    if (!savedMusicIds) {
        return false;
    }

    const updatedSavedMusicIds = savedMusicIds?.filter((savedMusicIds) => savedMusicIds !== musicId);
    localStorage.setItem('saved_music', JSON.stringify(updatedSavedMusicIds));

    return true;
}