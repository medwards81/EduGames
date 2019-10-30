import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class MakingWords extends PureComponent {
  state = {
    letter1: {},
    letter2: {},
    letter3: {},
    letter4: {}
  };

  addDropped = (letterNumber, letter, letterType) => {
    const stateKey = `letter${letterNumber}`;
    this.setState({
      [stateKey]: { id: letter, type: letterType }
    });
  };

  addLetter = e => {
    const letterNumbers = [1, 2, 3, 4];
    let letterNumberAvailable;
    for (let i = 1; i <= letterNumbers.length; i++) {
      if (this.state[`letter${i}`].type === undefined) {
        letterNumberAvailable = i;
        break;
      }
    }

    if (!letterNumberAvailable) return;

    const ele = e.target;
    const letter = ele.id;
    const letterType = ele.dataset.type;
    this.addDropped(letterNumberAvailable, letter, letterType);
  };

  removeLetter = e => {
    const ele = e.target;
    const letterNumber = ele.dataset.letterNumber;
    this.setState({
      [`letter${letterNumber}`]: {}
    });
  };

  resetLetters = () =>
    this.setState({ letter1: {}, letter2: {}, letter3: {}, letter4: {} });

  onDragEnd = result => {
    const { destination, draggableId, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const letterNumber = destination.droppableId.split("-")[1];
    const letter = draggableId;
    const letterType = source.droppableId;
    this.addDropped(letterNumber, letter, letterType);
  };

  renderLetterDroppables = () => {
    const letterNumbers = [1, 2, 3, 4];
    return letterNumbers.map(letterNumber => {
      const stateLetter = this.state[`letter${letterNumber}`];
      return (
        <Droppable
          key={letterNumber}
          droppableId={`letter-${letterNumber}`}
          direction="horizontal"
          type="letter"
        >
          {(provided, snapshot) => (
            <span
              className="fill-in-the-blank letter"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {stateLetter.type && (
                <span
                  data-letter-number={letterNumber}
                  className={`making-words-draggable ${stateLetter.type}`}
                  onDoubleClick={this.removeLetter}
                >
                  {stateLetter.id}
                </span>
              )}
              <div style={{ display: "none" }}>{provided.placeholder}</div>
            </span>
          )}
        </Droppable>
      );
    });
  };

  renderCols = (items = [], indexStart = 0, className = "") => {
    return items.map(item => (
      <Col key={item.length ? item : Math.random() * 99999}>
        {item.length ? (
          <Draggable draggableId={item} index={++indexStart}>
            {(provided, snapshot) => (
              <span
                id={item}
                data-type={className}
                className={`making-words-draggable ${className}`}
                onDoubleClick={this.addLetter}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {item}
              </span>
            )}
          </Draggable>
        ) : (
          <span>&nbsp;</span>
        )}
      </Col>
    ));
  };

  render() {
    return (
      <div className="MakingWords">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="text-right">
            <Link className="btn btn-sm btn-success" to="/morning/message">
              Next Game >
            </Link>
          </div>
          <h3 className="page-header" style={{ marginTop: "3em" }}>
            Making Words
          </h3>
          <Row>
            <Col>
              <div
                className="border rounded"
                style={{ marginTop: "20px", padding: "8px" }}
              >
                <Droppable
                  droppableId="consonant"
                  type="letter"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      className="consonant-droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Row>
                        {this.renderCols(
                          ["b", "c", "d", "f", "g"],
                          1,
                          "consonant"
                        )}
                      </Row>
                      <Row>
                        {this.renderCols(
                          ["h", "j", "k", "l", "m"],
                          6,
                          "consonant"
                        )}
                      </Row>
                      <Row>
                        {this.renderCols(
                          ["n", "p", "qu", "r", "s"],
                          11,
                          "consonant"
                        )}
                      </Row>
                      <Row>
                        {this.renderCols(
                          ["t", "v", "w", "x", "y"],
                          16,
                          "consonant"
                        )}
                      </Row>
                      <Row>{this.renderCols(["z"], 21, "consonant")}</Row>
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </Col>
            <Col>
              <div
                className="border rounded"
                style={{ marginTop: "20px", padding: "8px" }}
              >
                <Droppable
                  droppableId="vowel"
                  type="letter"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      className="vowel-droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Row>
                        {this.renderCols(
                          ["a", "e", "i", "o", "u"],
                          22,
                          "vowel"
                        )}
                      </Row>
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
                <Droppable
                  droppableId="digraph"
                  type="letter"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      className="digraph-droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Row>
                        {this.renderCols(
                          ["sh", "ch", "th", "", ""],
                          28,
                          "digraph"
                        )}
                      </Row>
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
              <div
                className="rounded"
                style={{
                  marginTop: "20px",
                  border: "4px solid #ccc",
                  height: "154px",
                  textAlign: "center",
                  overflow: "hidden"
                }}
              >
                <div
                  className="droppables-wrapper"
                  style={{ marginTop: "40px" }}
                >
                  {this.renderLetterDroppables()}
                  {/*
                  <Droppable
                    droppableId="letter-1"
                    direction="horizontal"
                    type="letter"
                  >
                    {(provided, snapshot) => (
                      <span
                        className="fill-in-the-blank letter"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {letter1.type && (
                          <span
                            data-letter-number="1"
                            className={`making-words-draggable ${letter1.type}`}
                            onDoubleClick={this.removeLetter}
                          >
                            {letter1.id}
                          </span>
                        )}
                        <div style={{ display: "none" }}>
                          {provided.placeholder}
                        </div>
                      </span>
                    )}
                  </Droppable>
                  <Droppable
                    droppableId="letter-2"
                    direction="horizontal"
                    type="letter"
                  >
                    {(provided, snapshot) => (
                      <span
                        className="fill-in-the-blank letter"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {letter2.type && (
                          <span
                            data-letter-number="1"
                            className={`making-words-draggable ${letter2.type}`}
                            onDoubleClick={this.removeLetter}
                          >
                            {letter2.id}
                          </span>
                        )}
                        <div style={{ display: "none" }}>
                          {provided.placeholder}
                        </div>
                      </span>
                    )}
                  </Droppable>
                  <Droppable
                    droppableId="letter-3"
                    direction="horizontal"
                    type="letter"
                  >
                    {(provided, snapshot) => (
                      <span
                        className="fill-in-the-blank letter"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div style={{ display: "none" }}>
                          {provided.placeholder}
                        </div>
                      </span>
                    )}
                  </Droppable>
                  <Droppable
                    droppableId="letter-4"
                    direction="horizontal"
                    type="letter"
                  >
                    {(provided, snapshot) => (
                      <span
                        className="fill-in-the-blank letter"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div style={{ display: "none" }}>
                          {provided.placeholder}
                        </div>
                      </span>
                    )}
                  </Droppable>*/}
                </div>
              </div>
              <div className="text-right">
                <Button
                  variant="success"
                  style={{ marginTop: "4px" }}
                  onClick={this.resetLetters}
                >
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </DragDropContext>
      </div>
    );
  }
}

export default MakingWords;
