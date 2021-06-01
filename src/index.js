import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { PandaBridgeRoot } from 'pandasuite-bridge-react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import IntlProvider from './components/IntlProvider';

ReactDOM.render(<PandaBridgeRoot><IntlProvider><App /></IntlProvider></PandaBridgeRoot>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
