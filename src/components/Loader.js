import React from "react";
import { FadingCircle } from "better-react-spinkit";

const Loader = props => {
  return (
    <div className="text-center" style={{ width: "60px", margin: "0 auto" }}>
      <FadingCircle size={props.size || 40} />
    </div>
  );
};

export default Loader;
