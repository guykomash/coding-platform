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
      const response: AxiosResponse = await executeCode(code);
      const stdout = response.data.run.stdout;
      const stderr = response.data.run.stderr;
      setOutput(stdout);
      if (stderr) {
        console.log(stderr);
      }
    } catch (err) {
      setOutput('Something went wrong...');
      console.log(err);
    }
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <h2
        style={{
          width: '100%',
          color: '#f2f2f2',
          textAlign: 'center',
        }}
      >
        Output
      </h2>
      <button style={{ color: '#6aa84f' }} onClick={() => runCode()}>
        Run Code
      </button>
      <div
        style={{
          border: '1px solid #f2f2f2',
          borderRadius: '1rem',
          height: '500px',
          width: '90%',
          padding: '1rem',
          marginLeft: '5rem',
          marginRight: '5rem',
          marginTop: '1rem',
          color: '#f2f2f2',
        }}
      >
        {output}
      </div>
    </div>
  );
};

export default Output;
