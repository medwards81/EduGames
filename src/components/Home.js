import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import calculator from "../calculator.svg";

const Home = () => (
  <div className="Home">
    <Row>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <img
                src={calculator}
                alt="Calculator icon"
                style={{
                  width: "25px",
                  height: "auto",
                  marginRight: "5px",
                  verticalAlign: "top"
                }}
              />
              Days in School
            </Card.Title>
            <Card.Text>
              Let's count how many days we've been in school!
            </Card.Text>
            <Link className="btn btn-primary" to="/days-in-school">
              Play Game
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Link className="btn btn-primary" to="/hank">
              Play Game
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Link className="btn btn-primary" to="/hank">
              Play Game
            </Link>
          </Card.Body>
        </Card>
      </Col>{" "}
    </Row>
  </div>
);

export default Home;
