import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ history, children }) => {
  useEffect(() => {
    const moveToTop = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      moveToTop();
    };
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(ScrollToTop);
