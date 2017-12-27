import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import EventEmitter from 'event-emitter';

window.ee = new EventEmitter();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
