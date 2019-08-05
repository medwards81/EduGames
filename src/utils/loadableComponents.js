import React from "react";
import Loadable from "react-loadable";
import Loader from "../components/Loader";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const Loading = props => {
  if (props.error) {
    return (
      <Alert variant="danger">
        There was an error in loading the content.{" "}
        <Button variant="primary" onClick={props.retry}>
          Retry
        </Button>
      </Alert>
    );
  } else if (props.pastDelay) {
    return <Loader message="Loading..." />;
  }
  return null;
};

const MyLoadable = opts =>
  Loadable({
    loading: Loading,
    delay: 300,
    ...opts
  });

export const AsyncDaysInSchool = MyLoadable({
  loader: () => import("../components/DaysInSchool")
});

export const AsyncWeatherGraph = MyLoadable({
  loader: () => import("../components/WeatherGraph")
});

export const AsyncHundredsChart = MyLoadable({
  loader: () => import("../components/HundredsChart")
});

export const AsyncNoMatch = MyLoadable({
  loader: () => import("../components/NoMatch")
});
