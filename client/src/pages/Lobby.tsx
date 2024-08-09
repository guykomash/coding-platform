import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CodeBlockItems } from '../types.ts';

import { Link } from 'react-router-dom';
import Palm from '../assets/icon-palm-tree.jpg';

const Lobby = () => {
  const [codeBlocks, setCodeblocks] = useState<CodeBlockItems>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCodeBlocks() {
      try {
        const response: AxiosResponse = await axios.get('/codeblock');
        console.log(response.data);
        setCodeblocks(response.data?.CodeBlocks);
        setError(null);
      } catch (err) {
        setCodeblocks([]);
        setError('Failed to fetch Code blocks');
      } finally {
        setLoading(false);
      }
    }

    fetchCodeBlocks();
  }, []);

  return (
    <div className="lobbyDiv">
      <br />
      <img
        src={Palm}
        width="200px"
        height="200px"
        title="Toms Coding Platform"
        alt="suppose to be palm"
        style={{ border: '2px solid black' }}
      />
      <h1>Tom's Coding Platform</h1>
      <h2>Choose Code Block</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong. try again later!</div>
      ) : codeBlocks.length > 0 ? (
        <div className="lobbyCodeblockGrid">
          {codeBlocks.map((cb) => (
            <div key={cb.codeBlockId}>
              <Link to={`codeblock/${cb.codeBlockId}`}>
                {' '}
                <button className="lobbyCodeblockBtn">{cb.name}</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>no codeblocks</p>
      )}
    </div>
  );
};

export default Lobby;
