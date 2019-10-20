// import React, { useState, useEffect } from 'react';
import React from 'react';
import { useHttp } from '../hooks/http'
import './CharPicker.css';

const CharPicker = props => {
  // const [loadedChars, setLoadedChars] = useState([]);
  // const [isLoading, setIsLoading] = useState( false );

  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people',[]);
  
  const selectedCharacters = fetchedData ? 
    fetchedData.results.slice(0, 5)
      .map((char, index) => ({
        name: char.name,
        id: index + 1
      })) : [];
  
  // useEffect(() => {    
  //   console.log('charPicker useEffect runs');  
    
    // setIsLoading(true);
    // fetch('https://swapi.co/api/people')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch.');
    //     }
    //     return response.json();
    //   })
    //   .then(charData => {
    //     const selectedCharacters = charData.results.slice(0, 5);
        
    //     setIsLoading(false);
    //     setLoadedChars( selectedCharacters.map((char, index) => ({
    //       name: char.name,
    //       id: index + 1
    //     })) );       
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
  // }, []);

  
    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      selectedCharacters &&
      selectedCharacters.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {selectedCharacters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!selectedCharacters || selectedCharacters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  
}

export default CharPicker;
