import React, { useEffect } from 'react';
import {useHttp} from '../hooks/http';

import Summary from './Summary';

const Character = props => {
  // const [loadedCharacter, setLoadedCharacter] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

// console.log('rendering');
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar])
  let loadedCharacter = null;
  if (fetchedData){
    loadedCharacter = {
        id: props.selectedChar,
        name: fetchedData.name,
        height: fetchedData.height,
        colors: {
          hair: fetchedData.hair_color,
          skin: fetchedData.skin_color
        },
        gender: fetchedData.gender,
        movieCount: fetchedData.films.length
      };
  }
  
  // const fetchData = () => {
  //   console.log(
  //     'Sending Http request for new character with id ' +
  //       props.selectedChar
  //   );
  //   setIsLoading(false);
  //   fetch('https://swapi.co/api/people/' + props.selectedChar)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Could not fetch person!');
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const loadedCharacter = {
  //         id: props.selectedChar,
  //         name: charData.name,
  //         height: charData.height,
  //         colors: {
  //           hair: charData.hair_color,
  //           skin: charData.skin_color
  //         },
  //         gender: charData.gender,
  //         movieCount: charData.films.length
  //       };
  //       setIsLoading(false);
  //       setLoadedCharacter(loadedCharacter);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     console.log('cleaning up ...');
  //   };
  // }, [props.selectedChar]);

  useEffect(() => {
    return () => {
      console.log('component did umount.');
    };
  }, []);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  
    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  
};

export default React.memo(Character);
