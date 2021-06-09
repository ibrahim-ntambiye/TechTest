
import axios from 'axios';
import React from 'react';


const FormList = (props) => {
    const { searchResults } = props;
 

    let sum = 0;
    let avg = 0;
    const lyricsCountArray = [];

    //CALCULATE THE AVERAGE
    const calculateAverange = (songsArray) => {
        for (var i = 0; i < songsArray.length; i++) {
            sum += parseInt(songsArray[i], 10); //don't forget to add the base
        }
        avg = sum / songsArray.length;
    }
//SETUP THE LYRICS-COUNT ARRAY
    const calculateLyrics = (songTitle) => {
        axios.get(`https://api.lyrics.ovh/v1/${props.artistName}/${songTitle}`).then(response => {
            let lyricsCount = response.data.lyrics.split(' ').length;
            lyricsCountArray.push(lyricsCount);
            
            
        })
            .catch(error => console.log(error))
    }

    const handleGetSongs = async (artistName) => {
        const songs = await axios.get(`http://musicbrainz.org/ws/2/release?query=artist:${artistName}`);
        const songTitles = await songs.data.releases.map(song => song.title);
        //console.log(songs);
        const uniqueSongTitles = [...new Set(songTitles)];
        // Search the lyrics API for all of these uniqueSongTitles and the artistName
        console.log(uniqueSongTitles);
       uniqueSongTitles.map( recordName => calculateLyrics(recordName));
        calculateAverange(lyricsCountArray);
        console.log(avg);


    };

    return (
        <>
            {searchResults.length !== 0 && (
                <div className="form-list-container">
                    <h1>Results</h1>
                    <div className="search-container">
                        {searchResults.map(result => {
                            if (result.type === "Person") {
                               // console.log(result);
                                return (
                                    <div className="search-result" key={result.id}>
                                        <span><b>Artist Name:</b> {result.name}</span>
                                        <br />
                                        <span><b>Search Match Score:</b> {result.score}</span>
                                        <br />
                                        <span><b>More info:</b> {result.disambiguation}</span>
                                        <br />
                                        <button className="calculate-button" onClick={() => handleGetSongs(result.name)}>Calculate Mean Lyrics</button>
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