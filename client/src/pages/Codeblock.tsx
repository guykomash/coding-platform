import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CodeBlockItem } from '../types';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';

const CodeBlock = () => {
  const { codeBlockId } = useParams();
  const [codeBlock, setCodeBlock] = useState<CodeBlockItem | object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCodeBlock() {
      try {
        const response: AxiosResponse = await axios.get(
          `/codeblock/${codeBlockId}`
        );
        setCodeBlock(response.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setCodeBlock({});
        setError('Failed to fetch Code blocks');
      } finally {
        setLoading(false);
      }
    }

    fetchCodeBlock();
  }, []);

  return (
    <>
      <h1 style={{ maxWidth: '50%', marginInline: 'auto' }}>Code Block</h1>
      {loading ? (
        <div>loading code block...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <div style={{ maxWidth: '90%', marginInline: 'auto' }}>
          <CodeEditor codeBlock={codeBlock} />
        </div>
      )}
    </>
  );
};

export default CodeBlock;
