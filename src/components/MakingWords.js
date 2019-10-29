import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class MakingWords extends PureComponent {
  state = {
    letters: []
  };

  addDropped = (id, type) => {
    this.setState({
      letters: [...this.state.letters, { id, type }]
    });
  };

  addLetter = e => {
    const ele = e.target;
    this.addDropped(ele.id, ele.dataset.type);
  };

  removeLetter = e => {
    const ele = e.target;
    const letterIndex = ele.dataset.index;
    const updatedLetters = [...this.state.letters];
    updatedLetters.splice(letterIndex, 1);
    this.setState({
      letters: updatedLetters
    });
  };

  resetLetters = () => this.setState({ letters: [] });

  onDragEnd = result => {
    const { destination, draggableId, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    this.addDropped(draggableId, source.droppableId);
  };

  renderLetters = () => {
    const { letters } = this.state;

    if (!letters.length > 0) return <span>&nbsp;</span>;

    return letters.map((letter, i) => (
      <span
        key={`${letter.id}-${i}`}
        data-index={i}
        className={`making-words-draggable ${letter.type}`}
        style={{ marginRight: "6px" }}
        onDoubleClick={this.removeLetter}
      >
        {letter.id}
      </span>
    ));
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
          <h3 className="page-header" style={{ margintop: "4em" }}>
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
                  lineHeight: "154px",
                  textAlign: "center",
                  overflow: "hidden"
                }}
              >
                <Droppable
                  droppableId="letter"
                  direction="horizontal"
                  type="letter"
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ height: "100%" }}
                    >
                      {this.renderLetters()}
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
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
