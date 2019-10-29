import React, { PureComponent } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class MakingWords extends PureComponent {
  state = {
    word: []
  };

  onDragEnd = result => {
    const { destination, draggableId, source } = result;
    console.log(destination, draggableId, source);
    if (!destination) return;

    if (destination.droppableId === source.droppableId) return;

    this.setState({ word: [...this.state.word, draggableId] });
  };

  setConsonant = e => this.setState({ consonant: e.target.id });
  clearConsonant = () => this.setState({ consonant: null });

  setVowel = e => this.setState({ vowel: e.target.id });
  clearVowel = () => this.setState({ vowel: null });

  setDigraph = e => this.setState({ digraph: e.target.id });
  clearDigraph = () => this.setState({ digraph: null });

  capitalizeFirst = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  renderCols = (items = [], indexStart = 0, className = "") => {
    return items.map(item => (
      <Col key={item.length ? item : Math.random() * 99999}>
        {item.length ? (
          <Draggable draggableId={item} index={++indexStart}>
            {(provided, snapshot) => (
              <span
                className={`making-words-draggable ${className}`}
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
    const { consonant, vowel } = this.state;
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
                  droppableId="consonants"
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
                  droppableId="vowels"
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
                  droppableId="digraphs"
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
                  padding: "8px",
                  border: "4px solid #ccc",
                  height: "154px",
                  lineHeight: "116px",
                  textAlign: "center"
                }}
              >
                <Droppable
                  droppableId="word"
                  direction="horizontal"
                  type="letter"
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      Marc
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </Col>
          </Row>
        </DragDropContext>
      </div>
    );
  }
}

export default MakingWords;
