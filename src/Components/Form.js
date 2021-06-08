import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Form = (props) => {
    const { setSearchResults } = props;
    const lyricsCountArray = []
    const sum = 0;
    const avg = 0;


    const [artistName, setArtist] = useState('');
    const [error, setError] = useState(false);

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

    const handleSubmit = async (event) => {
        if (artistName !== '') {
            setError(false);

            try {
                const response = await (axios.get(`http://musicbrainz.org/ws/2/artist?query=${artistName}&limit=10`));
                setSearchResults(response.data.artists);
            } catch (error) {
                setError(true);
            }
        }
    };

    return (
        <div className="form-container">
            <input type='text'
                placeholder="Enter artist name"
                value={artistName}
                onChange={event => setArtist(event.target.value)}
                required
                className="search-input"
            />
            <button className="search-button" onClick={handleSubmit}>Search!</button>
            {error && (
                <div className="error-toast">
                    <span>
                        An unexpected error occured, Please try again!
                    </span>
                    <button onClick={() => setError(false)}>Dismiss</button>
                </div>
            )}
        </div>
    );
};

export default Form;