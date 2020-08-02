import React from 'react';
import ReactDOM from 'react-dom';
import 'bulmaswatch/flatly/bulmaswatch.min.css';

import App from './App';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
