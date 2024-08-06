import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CodeBlockItems } from '../types.ts';

import { Link } from 'react-router-dom';

const Lobby: React.FC = () => {
  const [codeBlocks, setCodeblocks] = useState<CodeBlockItems>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCodeBlocks() {
      try {
        const response: AxiosResponse = await axios.get('/codeblock');
        setCodeblocks(response.data);
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
    <>
      <h1>Tom's Coding Platform</h1>
      <h2>Choose code block</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong. try again later!</div>
      ) : codeBlocks.length > 0 ? (
        codeBlocks.map((cb) => (
          <div key={cb.id}>
            <button>
              <Link to={`codeblock/${cb.id}`}>{cb.name}</Link>
            </button>
          </div>
        ))
      ) : (
        <p>no codeblocks</p>
      )}
    </>
  );
};

export default Lobby;
