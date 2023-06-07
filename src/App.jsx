import { useState, useEffect } from 'react'
import qs from 'qs';

import SearchInput from './components/SearchInput';
import Pagination from './Pagination';

const api = 'https://kitsu.io/api/edge/';

const LIMIT = 12;

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');
  const [offset, setOffset] = useState([0]);

  useEffect(() => {
    const query = {
      page: {
        limit: LIMIT,
        offset,
      }
    };

    if (text) {
      query.filter = {
        text,
      };
    }

    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => setInfo(response));

  }, [text, offset]);

  return (
    <div className="container">
      <SearchInput value={text} onChange={(search) => setText(search)} />

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

      {info.meta && (
        <Pagination
          limit={LIMIT}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  )
}

export default App;
