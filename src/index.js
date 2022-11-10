import React from 'react';
import ReactDOM from 'react-dom/client';
import { TwitterFeed } from './components/twitter-feed';
import { WhatsNew } from './components/whats-new';

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
