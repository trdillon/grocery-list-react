import React from "react";
import './custom.scss';
import TagManager from 'react-gtm-module'

import Header from "./component/Header";

const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx'
};

TagManager.initialize(tagManagerArgs)

function App() {
  return(
      <div className="app">
        <Header />
      </div>
  );
}

export default App;
