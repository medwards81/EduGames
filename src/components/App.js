import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Home from "./Home";
import {
  AsyncDaysInSchool,
  AsyncWeatherGraph,
  AsyncHundredsChart,
  AsyncNoMatch
} from "../utils/loadableComponents";
import { Link } from "react-router-dom";
import logoColor from "../logo-color.svg";

function App() {
  return (
    <div className="App">
      <div className="content" role="main">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <h3 style={{ marginLeft: "1em" }}>
              <Link to="/">
                <img
                  src={logoColor}
                  alt="EduGator logo"
                  style={{
                    width: "30px",
                    verticalAlign: "bottom",
                    marginRight: "4px"
                  }}
                />
                EduGator
              </Link>
            </h3>
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/days-in-school" component={AsyncDaysInSchool} />
            <Route path="/weather-graph" component={AsyncWeatherGraph} />
            <Route path="/hundreds-chart" component={AsyncHundredsChart} />
            <Route component={AsyncNoMatch} />
          </Switch>
        </Container>
      </div>
      <footer className="footer">
        &copy;Copyright {new Date().getFullYear()}{" "}
        <img
          src={logoColor}
          alt="EduGator logo"
          style={{
            width: "12px",
            height: "auto",
            marginTop: "-3px",
            marginRight: "2px"
          }}
        />
        EduGator.
      </footer>
    </div>
  );
}

export default App;
