import React from 'react';
import ReactDOM from 'react-dom/client';
import { TwitterFeed } from './components/twitter-feed';
import { WhatsNew } from './components/whats-new';
import './index.css'

const whatsNewRoot = ReactDOM.createRoot(document.getElementById('whats-new'));
whatsNewRoot.render(
  <React.StrictMode>
    {/* <div id='wrapper'>
      <div id='left-wrapper'>
        <WhatsNew endpoint={'api/getContent'} />
        </div>
        <div id='left-wrapper'>
        <div id='other-child'>something</div>
        </div>
      </div> */}
      <WhatsNew endpoint={'api/getContent'} />
  </React.StrictMode>
);

const twitterFeedRoot = ReactDOM.createRoot(document.getElementById('twitter-feed-wrapper'));
twitterFeedRoot.render(
  <React.StrictMode>
    <TwitterFeed />
  </React.StrictMode>
);
