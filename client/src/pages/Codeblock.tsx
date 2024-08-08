import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { socket } from '../socket';

// Types
import { CodeBlockItem } from '../types';

import '../style.css';

import Smiley from '../assets/Smiley.png';

const CodeBlock = () => {
  const navigate = useNavigate();
  const { codeBlockId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Socket
  const [studentCounter, setStudentCounter] = useState<number>(0);
  const [role, setRole] = useState<string>('loading role...');
  const [code, setCode] = useState<string>('');
  const [codeBlockName, setCodeBlockName] = useState<string>('');
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    const initCodeBlock = (codeBlock: CodeBlockItem) => {
      console.log(codeBlock);
      if (!codeBlock) {
        setError('Failed to fetch Code blocks');
        setCode('');
        setCodeBlockName('');
        setLoading(false);
        return;
      }
      const { name, templateCode } = codeBlock;
      if (!name || !templateCode) {
        setError('Failed to fetch Code blocks');
        setCode('');
        setCodeBlockName('');
        setLoading(false);
        return;
      }
      // Success.
      setCode(templateCode);
      setCodeBlockName(name);
      setError(null);
      setLoading(false);
      return;
    };

    socket.connect();

    // Socket listeners
    socket.on('initCodeBlock', (codeBlock) => initCodeBlock(codeBlock));
    socket.on('codeChange', (code: string) => setCode(code));
    socket.on('codeSolved', (isSolved: boolean) => setIsSolved(isSolved));
    socket.on('role', (role: string) => setRole(role));
    socket.on('studentCount', (count: number) => setStudentCounter(count - 1));
    socket.on('mentorDisconnected', () => navigate('/'));

    socket.emit('joinRoom', codeBlockId);

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
    <div className="codeblock">
      <h1 className="codeblockname">
        <strong>Code Block:&nbsp;&nbsp;</strong>
        {codeBlockName}
      </h1>

      <button onClick={() => navigate('/')}>Back to Home Page</button>

      {loading ? (
        <div>loading code block...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <div className="platfrom">
          <div className="info">
            <p>
              Connected as:{' '}
              <strong
                style={
                  role === 'Student'
                    ? { color: '#ffd966' }
                    : { color: '#5ad25a' }
                }
              >
                {role}
              </strong>
            </p>
            <p>
              Students in room: <strong>{studentCounter}</strong>
            </p>
          </div>

          {isSolved ? (
            <div className="smileyDiv">
              <img src={Smiley} alt="code is correct" />

              <button onClick={() => setIsSolved(false)}>
                {' '}
                Back to Editor
              </button>
            </div>
          ) : (
            <CodeEditor
              code={code}
              handleCodeChange={onCodeChange}
              role={role}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
