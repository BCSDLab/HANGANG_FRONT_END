import App from "App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "GlobalStyle";
import ModalProvider from "containers/Shared/ModalProvider";
import { Provider } from "react-redux";
import React from "react";
import ReactDom from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import { initializeAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import store from "store";

if (process.env.NODE_ENV === "production") {
  const firebaseConfig = {
    apiKey: "AIzaSyDZSkOmK1P8UCIVQXsAKp6geMOeR2RtUas",
    authDomain: "hangang-e3330.firebaseapp.com",
    projectId: "hangang-e3330",
    storageBucket: "hangang-e3330.appspot.com",
    messagingSenderId: "642816113964",
    appId: "1:642816113964:web:a924bbf0ff0432f5e94089",
    measurementId: "G-6557HN7M06"
  }
  const firebaseApp = initializeApp(firebaseConfig);
  initializeAnalytics(firebaseApp);
}

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
