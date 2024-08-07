import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CodeBlockItem } from '../types';
import { useNavigate, redirect, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { socket } from '../socket';

const CodeBlock = () => {
  const navigate = useNavigate();
  const { codeBlockId } = useParams();
  const [codeBlock, setCodeBlock] = useState<CodeBlockItem | object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Socket
  const [studentCounter, setStudentCounter] = useState<number>(0);
  const [role, setRole] = useState<string>('loading role...');
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    // Fetch code block data
    const fetchCodeBlock = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `/codeblock/${codeBlockId}`
        );
        setCodeBlock(response.data);
        setCode(response.data.templateCode);
        setError(null);
      } catch (err) {
        console.log(err);
        setCodeBlock({});
        setError('Failed to fetch Code blocks');
      } finally {
        setLoading(false);
      }
    };
    fetchCodeBlock();

    // Connect to socket and room
    socket.connect();
    socket.emit('joinRoom', codeBlockId);

    // Socket listeners
    socket.on('role', (role: string) => setRole(role));
    socket.on('studentCount', (count: number) => setStudentCounter(count - 1));
    socket.on('mentorDisconnected', () => navigate('/'));
    socket.on('codeChange', (code: string) => setCode(code));

    return () => {
      // Remove the listeners.
      socket.off('studentCount');
      socket.off('role');
      socket.off('codeChange');
      socket.disconnect();
    };
  }, []);

  const onCodeChange = (code: string) => {
    setCode(code);
    socket.emit('codeChange', { roomId: codeBlockId, code: code });
  };

  return (
    <>
      <h1 style={{ maxWidth: '50%', marginInline: 'auto' }}>Code Block</h1>
      {loading ? (
        <div>loading code block...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <div style={{ maxWidth: '80%', marginInline: 'auto' }}>
          <p>Connected as: {role}</p>
          <p>Student connected: {studentCounter}</p>
          <CodeEditor code={code} handleCodeChange={onCodeChange} role={role} />
        </div>
      )}
    </>
  );
};

export default CodeBlock;
