import React, { PureComponent } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { storageTest } from "../utils/localStorage";
import ghost from "../ghost.svg";

class MorningMessage extends PureComponent {
  morningMode = this.props.match.params.mode;

  initState = {
    words: [],
    currentColor: "red",
    isEditMode: false,
    fontSizeEm: 1.5,
    isGhostyMode: false,
    morningMode: this.morningMode
  };

  state = this.initState;

  hasLocalStorageSupport = storageTest();

  wordsRef = React.createRef();

  lsKey = this.morningMode.charAt(0).toUpperCase() + this.morningMode.slice(1);

  componentDidMount() {
    if (this.hasLocalStorageSupport) {
      const words = localStorage.getItem(`Morning${this.lsKey}Words`);
      if (words) {
        const wordsArr = JSON.parse(words);
        if (wordsArr.length)
          this.setState({
            words: JSON.parse(words)
          });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { words } = this.state;
    if (this.hasLocalStorageSupport) {
      localStorage.setItem(`Morning${this.lsKey}Words`, JSON.stringify(words));
    }
  }

  setEditMode = () => {
    const isEditMode = !this.state.isEditMode;
    this.setState({ isEditMode }, () => {
      if (isEditMode) this.wordsRef.current.focus();
    });
  };

  resetState = () => this.setState(this.initState);

  updateWords = () => {
    const textArea = this.wordsRef.current;
    if (!textArea) return;
    const textVal = textArea.value.trim().replace(/\n/g, " <br> ");
    this.setState({
      words: textVal.split(/\s+/),
      isEditMode: false
    });
  };

  getWordsFormatted = () => {
    const { words } = this.state;
    return words.join(" ").replace(/<br>/g, "\n");
  };

  setColor = e => {
    const { currentColor } = this.state;
    const colorToSet = e.target.className;
    this.setState({
      currentColor: currentColor === colorToSet ? null : colorToSet,
      isGhostyMode: false
    });
  };

  setGhostyMode = e => {
    const { isGhostyMode } = this.state;
    this.setState({
      isGhostyMode: !isGhostyMode,
      currentColor: null
    });
  };

  setWordColor = e => {
    const { currentColor, isGhostyMode } = this.state;
    const currentEle = e.target;

    if (isGhostyMode) currentEle.classList.toggle("ghosty");
    let hasGhostyClass = currentEle.classList.contains("ghosty");

    if (!isGhostyMode && hasGhostyClass) {
      hasGhostyClass = false;
      currentEle.classList.remove("ghosty");
    }

    const currentBgColor = currentEle.style.backgroundColor;
    currentEle.style.backgroundColor =
      hasGhostyClass || !currentColor || currentBgColor === currentColor
        ? "inherit"
        : currentColor;
    currentEle.style.color = hasGhostyClass
      ? "white"
      : !currentColor ||
        currentBgColor === currentColor ||
        currentColor === "yellow"
      ? "inherit"
      : "white";
  };

  setFontSize = e => {
    let { fontSizeEm } = this.state;
    const buttonEle = e.target;
    if (buttonEle.id === "plus") fontSizeEm += 0.3;
    else fontSizeEm -= 0.3;
    this.setState({ fontSizeEm });
  };

  goToMessage = () => {
    window.location.replace("/morning/message");
  };

  render() {
    const {
      words,
      isEditMode,
      currentColor,
      fontSizeEm,
      isGhostyMode
    } = this.state;
    const contentStyle = {
      width: "100%",
      height: "26rem",
      borderRadius: "8px",
      fontSize: `${fontSizeEm}em`,
      padding: "16px",
      overflow: "auto"
    };
    return (
      <div className="MorningMessage">
        <div className="text-right">
          {this.morningMode === "poem" ? (
            <Button
              variant="success"
              className="btn-sm"
              onClick={this.goToMessage}
            >
              Next Game >
            </Button>
          ) : (
            <Link className="btn btn-sm btn-success" to="/calendar">
              Next Game >
            </Link>
          )}
        </div>
        <h3 className="page-header">Morning {this.lsKey}</h3>
        <div style={{ marginBottom: "1em" }}>
          {isEditMode ? (
            <div className="text-center">
              <textarea
                ref={this.wordsRef}
                style={{
                  ...contentStyle,
                  border: "4px dashed",
                  outline: "none"
                }}
                defaultValue={this.getWordsFormatted()}
              />
              <Button
                variant="success"
                onClick={this.updateWords}
                style={{ width: "75px" }}
              >
                Update
              </Button>
            </div>
          ) : (
            <div
              style={{
                ...contentStyle,
                background: "#fff",
                border: "4px solid #ccc"
              }}
            >
              {words.map((word, idx) => {
                if (word === "<br>") return <br key={idx} />;
                return (
                  <span key={idx} style={{ marginLeft: "4px" }}>
                    <span
                      onClick={this.setWordColor}
                      style={{
                        padding: "2px",
                        cursor: "pointer",
                        borderBottom: "2px solid white",
                        display: "inline-block"
                      }}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <Row>
          <Col>
            <div className="text-center">
              {[
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple",
                "ghost"
              ].map(color => {
                if (color === "ghost")
                  return (
                    <img
                      key={color}
                      src={ghost}
                      alt="ghosty"
                      style={{
                        height: "40px",
                        width: "40px",
                        marginLeft: "1em",
                        cursor: "pointer",
                        padding: "2px",
                        borderRadius: "5px",
                        border: isGhostyMode
                          ? "4px solid #000"
                          : "4px solid #fff"
                      }}
                      onClick={this.setGhostyMode}
                    />
                  );
                return (
                  <span
                    key={color}
                    className={color}
                    onClick={this.setColor}
                    style={{
                      display: "inline-block",
                      width: "35px",
                      height: "35px",
                      borderRadius: "5px",
                      background: color,
                      cursor: "pointer",
                      border:
                        currentColor === color
                          ? "4px solid #000"
                          : "4px solid #fff"
                    }}
                  >
                    &nbsp;
                  </span>
                );
              })}
            </div>
          </Col>
          <Col>
            <div className="text-center">
              Font Size &nbsp;
              <Button
                id="minus"
                variant="secondary"
                onClick={this.setFontSize}
                style={{ padding: "0 2px", width: "25px" }}
              >
                -
              </Button>
              &nbsp;
              <Button
                id="plus"
                variant="secondary"
                onClick={this.setFontSize}
                style={{ padding: "0 2px", width: "25px" }}
              >
                +
              </Button>
            </div>
          </Col>
        </Row>
        <div className="text-center" style={{ marginTop: "32px" }}>
          <Button
            variant="success"
            onClick={this.setEditMode}
            style={{ width: "75px" }}
          >
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="primary"
            onClick={this.resetState}
            style={{ width: "75px" }}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default MorningMessage;
