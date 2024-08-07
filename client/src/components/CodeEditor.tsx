import { useEffect, useRef, useState } from 'react';
import { Editor, EditorProps } from '@monaco-editor/react';
import { CodeBlockItem } from '../types';
import Output from './Output';

interface CodeEditorProps {
  codeBlock: CodeBlockItem | object;
}

const CodeEditor = ({ codeBlock }: CodeEditorProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const getDefaultValue = (codeBlock: CodeEditorProps['codeBlock']) => {
      const template =
        (codeBlock as CodeBlockItem).templateCode || 'Happy coding!';
      setValue(template);
    };

    getDefaultValue(codeBlock);
  }, []);

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
          value={value}
          onChange={(newValue: string | undefined) => {
            setValue(newValue || '');
            // console.log(newValue);
          }}
          //   options={{ readOnly: true }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <Output code={value} />
      </div>
    </div>
  );
};

export default CodeEditor;
