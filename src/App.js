import React from "react";
import './custom.scss';
import TagManager from 'react-gtm-module'

import Header from "./component/Header";

const tagManagerArgs = {
    gtmId: 'GTM-PDGQF24'
};

TagManager.initialize(tagManagerArgs)

function App() {
    window.dataLayer.push({
        event: 'pageview'
    });
  return(
      <div className="app">
        <Header />
      </div>
  );
}

export default App;
