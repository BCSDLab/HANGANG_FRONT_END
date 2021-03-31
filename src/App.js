import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "pages/AuthPages/LoginPage";
import FindPwPage from "pages/AuthPages/FindPwPage";
import FindPwAuthPage from "pages/AuthPages/FindPwAuthPage";
import SignUpPage from "pages/AuthPages/SignUpPage";
import SignUpAuthPage from "pages/AuthPages/SignUpAuthPage";
import IndexPage from "pages/IndexPage";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
} from "utils/localStorageUtils";

const Main = styled.main`
  height: 100%;
`;

const App = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      const autoLoginKey = getValueOnLocalStorage("didHangangAutoLogin");
      if (!autoLoginKey) {
        removeValueOnLocalStorage("hangangToken");
      }
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        const autoLoginKey = getValueOnLocalStorage("didHangangAutoLogin");
        if (!autoLoginKey) {
          removeValueOnLocalStorage("hangangToken");
        }
      });
    };
  }, []);

  return (
    <Main role="main">
      <Router>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/findpwauth" component={FindPwAuthPage} />
          <Route path="/findpw" component={FindPwPage} />
          <Route path="/signupauth" component={SignUpAuthPage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </Router>
    </Main>
  );
};

export default App;
