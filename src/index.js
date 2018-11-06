import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { HashRouter } from "react-router-dom";

// import { ObserveAPIinReact } from "./Tests";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
