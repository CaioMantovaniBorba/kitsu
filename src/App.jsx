import { useState, useEffect } from 'react'

import SearchInput from './components/SearchInput';

const api = 'https://kitsu.io/api/edge/';

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      fetch(`${api}anime?filter[text]=${text}`)
        .then((response) => response.json())
        .then((response) => setInfo(response));
        console.log(info.data);
      }

  }, [text]);

  return (
    <>

      <SearchInput value={text} onChange={(search) => setText(search)}/>

      {info.data && (
        <ul>
          {info.data.map(item => <li key={item.id}>{item.attributes.canonicalTitle}</li> )}

        </ul>
      )}
    </>
  )
}

export default App;
