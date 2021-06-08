
import axios from 'axios';
import React, { useState } from 'react';


const FormList = (props) => {
    const { searchResults } = props;
    const [artistName, setArtist] = useState('');
    const setArtistState = (name) => setArtist(name);

    const sum = 0;
    const avg = 0;
    const lyricsCountArray = [];

    const calculateAverange = (songsArray) => {
        for (var i = 0; i < songsArray.length; i++) {
            sum += parseInt(songsArray[i], 10); //don't forget to add the base
        }
        avg = sum / songsArray.length;
    }

    const calculateLyrics = (songTitle) => {
        axios.get(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`).then(response => {
            let lyricsCount = response.data.lyrics.split(' ').length
            lyricsCountArray.push(lyricsCount)
            console.log(lyricsCountArray)
            return lyricsCount;
        })
            .catch(error => console.log(error))
    }

    const handleGetSongs = async (artistName) => {
        const songs = await axios.get(`http://musicbrainz.org/ws/2/release?query=artist:${artistName}`);
        const songTitles = await songs.data.releases.map(song => song.title);
        const uniqueSongTitles = [...new Set(songTitles)];
        // Search the lyrics API for all of these uniqueSongTitles and the artistName
        console.log(uniqueSongTitles);

    };

    return (
        <>
            {searchResults.length !== 0 && (
                <div className="form-list-container">
                    <h1>Results</h1>
                    <div className="search-container">
                        {searchResults.map(result => {
                            if (result.type === "Person") {
                                console.log(result);
                                return (
                                    <div className="search-result" key={result.id}>
                                        <span><b>Artist Name:</b> {result.name}</span>
                                        <br />
                                        <span><b>Search Match Score:</b> {result.score}</span>
                                        <br />
                                        <span><b>More info:</b> {result.disambiguation}</span>
                                        <br />
                                        <button className="calculate-button" onClick={() => handleGetSongs(result.name)}>Calculate Word Count</button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default FormList;