import React, { useState } from "react";
import Form from "./Components/Form";
import './App.css';
import FormList from "./Components/FormList";

function App(props) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <h1>Average Artist Word Count</h1>
      <Form setSearchResults={setSearchResults} />
      <FormList searchResults={searchResults} />
    </div>
  );
}

export default App;
