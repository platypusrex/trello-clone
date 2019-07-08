import React from 'react';
import { Global as EmotionGlobal, css } from '@emotion/core';

const globalStyles = css`
  html, body {
    height: 100%;
  }
  
  #root {
    display: flex;
    min-height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export const Global: React.FC<{}> = () => <EmotionGlobal styles={globalStyles}/>;