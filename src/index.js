import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { TwitterFeed } from './twitter-feed';
import { WhatsNew } from './whats-new';

const whatsNewRoot = ReactDOM.createRoot(document.getElementById('whats-new'));
whatsNewRoot.render(
  <React.StrictMode>
    <WhatsNew endpoint={'api/getContent'} />
  </React.StrictMode>
);

const twitterFeedRoot = ReactDOM.createRoot(document.getElementById('twitter-feed-wrapper'));
twitterFeedRoot.render(
  <React.StrictMode>
    <TwitterFeed />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
