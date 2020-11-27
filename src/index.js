import React from "react";
import ReactDOM from "react-dom";
import ReactGA from 'react-ga';
import { BrowserRouter } from "react-router-dom";

import App from "./App";

ReactGA.initialize('UA-tracking-id');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
