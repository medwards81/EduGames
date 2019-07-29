import React from "react";
import Alert from "react-bootstrap/Alert";

const NoMatch = ({ location }) => (
  <div className="NoMatch">
    <Alert variant="danger">Page not found.</Alert>
    <p>
      The requested resource <code>{location.pathname}</code> could not be
      found.
    </p>
  </div>
);

export default NoMatch;
