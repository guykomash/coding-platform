import { useState } from 'react';
import { executeCode } from '../api/exectueCode';
import { AxiosResponse } from 'axios';

interface OutputProps {
  code: string;
}

const Output = ({ code }: OutputProps) => {
  const [output, setOutput] = useState<string>('');

  const runCode = async () => {
    if (!code) {
      console.log(`code not good`);
    }
    try {
      setOutput('Running Code...');
      const response: AxiosResponse = await executeCode(code);
      const stdout = response.data.run.stdout;
      const stderr = response.data.run.stderr;
      if (stderr) {
        setOutput(stderr);
      } else {
        setOutput(stdout);
      }
    } catch (err) {
      setOutput('Something went wrong...');
      console.log(err);
    }
  };

  return (
    <div className="output">
      <h2>Output</h2>
      <button style={{  }} onClick={() => runCode()}>
        Run Code
      </button>
      <div className="outputText">{output}</div>
    </div>
  );
};

export default Output;
