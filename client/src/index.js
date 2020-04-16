import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/';
import * as sw from './utils/serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

sw.register();
