import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "pages/AuthPages/LoginPage";
import SignUpPage from "pages/AuthPages/SignUpPage";
import EmailAuthPage from "pages/AuthPages/EmailAuthPage";

const Main = styled.main`
  height: 100%;
`;

const App = () => {
  return (
    <Main role="main">
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/emailauth" component={EmailAuthPage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </Router>
    </Main>
  );
};

export default App;
