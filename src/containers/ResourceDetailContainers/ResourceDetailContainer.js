import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const ResourceDetailContainer = () => {
  let { resourceId } = useParams();
  return (
    <div>
      <span>{resourceId}</span>
      <span>sdfsdf</span>
    </div>
  );
};

export default ResourceDetailContainer;
