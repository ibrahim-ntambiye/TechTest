import React, { useState } from "react";
import Form from "./Components/Form";
import './App.css';
import FormList from "./Components/FormList";

function App(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [artistName, setArtist] = useState('');

  return (
    <div className="App">
      <h1>Average Artist Word Count</h1>
      <Form setSearchResults={setSearchResults} setArtist={setArtist} artistName={artistName}/>
      <FormList searchResults={searchResults} artistName={artistName}/>
    </div>
  );
}

export default App;
