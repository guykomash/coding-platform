import React from 'react';
import ReactDOM from 'react-dom/client';

import Codeblock from './pages/CodeBlock.tsx';
import Lobby from './pages/Lobby.tsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lobby />,
  },
  {
    path: 'codeblock/:codeBlockId',
    element: <Codeblock />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
