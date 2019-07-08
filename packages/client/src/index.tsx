import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { apolloClient as client } from './apolloClient';
import 'typeface-raleway';
import { App } from './App';
import { Global } from './shared/styled/Global';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.Fragment>
      <Global/>
      <Router>
        <App />
      </Router>
    </React.Fragment>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to Register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
