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
    <div className="editorDiv">
      <div className="codeDiv">
        <h2>Code</h2>
        <Editor
          // min
          className="codeDiv"
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
      <div className="outputDiv">
        <Output code={code} />
      </div>
    </div>
  );
};

export default CodeEditor;
