import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LectureDetailContainer from "containers/LectureDetailContainers";

/**
 * lecture/{lectureId}
 */
const LectureDetailPage = () => {
  return (
    <Switch>
      <Route path="/lecture/:lectureId" component={LectureDetailContainer} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default LectureDetailPage;
