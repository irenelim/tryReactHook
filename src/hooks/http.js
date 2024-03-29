import {useState, useEffect} from 'react';

export const useHttp = (url, dependencies)=>{
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    // fetch('https://swapi.co/api/people')
    useEffect(()=>{
        setIsLoading(true);
        console.log('sending Http request to URL: ' + url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        // const selectedCharacters = charData.results.slice(0, 5);
        
        // setIsLoading(false);
        // setLoadedChars( selectedCharacters.map((char, index) => ({
        //   name: char.name,
        //   id: index + 1
        // })) ); 
        setIsLoading(false);
        setFetchedData(data);  
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    }, dependencies);

    
    

      return [isLoading, fetchedData];
};

