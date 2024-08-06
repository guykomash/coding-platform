import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CodeBlockItem } from '../types';
import { useParams } from 'react-router-dom';

const Codeblock: React.FC = () => {
  const {codeBlockId} = useParams()
  const [codeBlock, setCodeBlock] = useState < CodeBlockItem | {}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCodeBlock () {
      try {
        const response: AxiosResponse = await axios.get(`/codeblock/${codeBlockId}`);
        setCodeBlock(response.data);
        setError(null);
      } catch (err) {
        setCodeBlock([]);
        setError('Failed to fetch Code blocks');
      } finally {
        setLoading(false);
      }
    }

    fetchCodeBlock();
  }, []);




  return (
  
  
  
  )
}

export default CodeBlock;
