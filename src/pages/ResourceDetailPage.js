import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ResourceDetailContainer from "containers/ResourceDetailContainers";

/**
 * If user access with ~/resource, push user to home.
 */
const ResourceDetailPage = () => {
  return (
    <Switch>
      <Route path="/resource/:resourceId" component={ResourceDetailContainer} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default ResourceDetailPage;
