import React from 'react';

const FormList = (props) => {
    const { searchResults } = props;

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
                                        <button className="calculate-button">Calculate Word Count</button>
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
