import React from "react";
import { FadingCircle } from "better-react-spinkit";

const Loader = props => {
  return (
    <div className="panel-body text-center">
      <FadingCircle size={props.size || 22} className="mvr-spinner" />
      <div className="mvr-spinner-text">{props.message}</div>
    </div>
  );
};

export default Loader;
