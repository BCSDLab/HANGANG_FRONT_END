import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import store from "store";
import App from "App";
import GlobalStyle from "GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "containers/Shared/ModalProvider";

ReactDom.render(
  <Provider store={store}>
    <ToastProvider>
      <ModalProvider>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);
