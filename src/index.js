import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const application = ReactDOMClient.createRoot(document.getElementById('application'));
application.render(<App />);