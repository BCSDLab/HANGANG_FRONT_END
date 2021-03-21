import App from "App";
import GlobalStyle from "GlobalStyle";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);
