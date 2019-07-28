import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Home from "./Home";
import NoMatch from "./NoMatch";

function App() {
  return (
    <div className="App">
      <div className="content" role="main">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Educational Games</Navbar.Brand>
        </Navbar>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </div>
    </div>
  );
}

export default App;
