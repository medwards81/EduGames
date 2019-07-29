import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Home from "./Home";
import { AsyncDaysInSchool, AsyncNoMatch } from "../utils/loadableComponents";
import { Link } from "react-router-dom";
import logo from "../logo-40x40.png";

function App() {
  return (
    <div className="App">
      <div className="content" role="main">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <h3 style={{ marginLeft: "1em" }}>
              <Link to="/">
                <img src={logo} alt="EduGames logo" />
                EduGames
              </Link>
            </h3>
          </Navbar.Brand>
        </Navbar>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/days-in-school" component={AsyncDaysInSchool} />
            <Route component={AsyncNoMatch} />
          </Switch>
        </Container>
      </div>
      <footer className="footer">
        &copy;Copyright {new Date().getFullYear()}{" "}
        <img
          src={logo}
          alt="EduGames logo"
          style={{ width: "10px", height: "auto", marginTop: "-3px" }}
        />
        EduGames.
      </footer>
    </div>
  );
}

export default App;
