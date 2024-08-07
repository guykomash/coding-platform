// import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';

import Output from './Output';

interface CodeEditorProps {
  code: string;
  handleCodeChange: (code: string) => void;
  role: string;
}

const CodeEditor = ({ code, handleCodeChange, role }: CodeEditorProps) => {
  // useEffect(() => {

  //   const getDefaultValue = (codeBlock: CodeEditorProps['codeBlock']) => {
  //     const template =
  //       (codeBlock as CodeBlockItem).templateCode || 'Happy coding!';
  //     setCode(template);
  //   };

  //   getDefaultValue(codeBlock);
  // }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#100b12 ',
        padding: '1rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <h2
          style={{
            width: '100%',
            color: '#f2f2f2',
            textAlign: 'center',
          }}
        >
          Code
        </h2>
        <Editor
          height="600px"
          width="100%"
          defaultLanguage="javascript"
          //   defaultValue={}
          theme="vs-dark"
          value={code}
          onChange={(c: string | undefined) => {
            handleCodeChange(c || '');
            // console.log(newValue);
          }}
          options={{ readOnly: role === 'Mentor' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <Output code={code} />
      </div>
    </div>
  );
};

export default CodeEditor;
