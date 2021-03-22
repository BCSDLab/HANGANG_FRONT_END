import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import store from "store";
import App from "App";
import GlobalStyle from "GlobalStyle";

ReactDom.render(
  <Provider store={store}>
    <ToastProvider>
      <GlobalStyle />
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);
