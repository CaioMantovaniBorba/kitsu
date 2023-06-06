import { useState, useEffect } from 'react'

import SearchInput from './components/SearchInput';

const api = 'https://kitsu.io/api/edge/';

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      setInfo({});
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
        .then((response) => response.json())
        .then((response) => setInfo(response));
      }
  }, [text]);

  return (
    <div className="container">
      <SearchInput value={text} onChange={(search) => setText(search)}/>

      {text && !info.data && (
        <span className="loader"></span>
      )}

      {info.data && (
        <ul>
          {info.data.map(item =>
          <li key={item.id}>
            <img src={item.attributes.posterImage.small} alt="Anime image" />
            {item.attributes.canonicalTitle}
          </li>)}
        </ul>
      )}
    </div>
  )
}

export default App;
