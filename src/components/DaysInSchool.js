import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import onesImg from "../unit.jpg";
import hundredsImg from "../hundreds.png";
import tensImg from "../tens.png";
import onesGroupImg from "../ones-group.jpg";
import tensGroupImg from "../tens-group.jpg";
import { storageTest } from "../utils/localStorage";

class DaysInSchool extends Component {
  initialState = {
    hundreds: 0,
    tens: 0,
    ones: 0,
    transitionUnit: null
  };

  hasLocalStorageSupport = storageTest();

  state = this.initialState;

  componentDidMount() {
    if (this.hasLocalStorageSupport) {
      const storedState = localStorage.getItem("daysInSchool");
      if (storedState) this.setState(JSON.parse(storedState));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transitionUnit } = this.state;

    if (this.hasLocalStorageSupport)
      localStorage.setItem("daysInSchool", JSON.stringify(this.state));

    if (
      (prevState.transitionUnit === null && transitionUnit !== null) ||
      prevState.transitionUnit !== transitionUnit
    ) {
      setTimeout(
        () =>
          this.setState({
            ...this.state,
            transitionUnit: transitionUnit ? transitionUnit.toLowerCase() : null
          }),
        500
      );
    }
  }

  addDropped = unit => {
    const newState = {
      ...this.state
    };

    newState[unit] += 1;
    if (newState[unit] === 10) newState.transitionUnit = unit.toUpperCase();

    if (unit === "tens") newState.ones = 0;
    else if (unit === "hundreds") newState.tens = 0;

    this.setState(newState);
  };

  onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    this.addDropped(destination.droppableId);
  };

  getCount = () => {
    const { hundreds, tens, ones } = this.state;
    let sum = 0;
    sum += hundreds * 100;
    sum += tens * 10;
    sum += ones * 1;

    return sum > 0 ? sum : null;
  };

  reset = () => this.setState(this.initialState);

  renderUnits = unit => {
    const numUnits = this.state[unit];

    if (this.state.transitionUnit === unit && numUnits === 10) {
      const unitGroupId = `${unit}-group`;
      let imgSource;
      if (unit === "ones") imgSource = onesGroupImg;
      else if (unit === "tens") imgSource = tensGroupImg;
      return (
        <Draggable draggableId={unitGroupId} index={0}>
          {(provided, snapshot) => (
            <img
              className="img-unit unit fade-in"
              src={imgSource}
              alt={`${unit} block`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            />
          )}
        </Draggable>
      );
    }

    const unitArr = [];
    for (let i = 1; i <= numUnits; i++) {
      unitArr.push(i);
    }

    return unitArr.map((d, i) => {
      const unitId = `${unit}-${i}`;
      return (
        <Draggable
          draggableId={unitId}
          index={i}
          key={unitId}
          isDragDisabled={true}
        >
          {(provided, snapshot) => {
            const draggable =
              unit === "ones" ? (
                <span
                  key={i}
                  className="days-in-school-draggable-unit"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <img src={onesImg} alt="" />
                </span>
              ) : (
                <img
                  key={i}
                  src={unit === "tens" ? tensImg : hundredsImg}
                  className="img-unit img-unit-draggable"
                  alt="unit group"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                />
              );
            return draggable;
          }}
        </Draggable>
      );
    });
  };

  handleDoubleClick = () => {
    if (this.state["ones"] < 10) this.addDropped("ones");
  };

  render() {
    const { transitionUnit } = this.state;
    const units = ["hundreds", "tens", "ones"];

    return (
      <div className="DaysInSchool">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h3 className="page-header">
            Today, we have been in school for{" "}
            <span className="days-in-school-num">{this.getCount()}</span> days!
          </h3>
          <table className="days-in-school-table table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Hundreds</th>
                <th scope="col">Tens</th>
                <th scope="col">Ones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {units.map((unit, i) => {
                  const isTenUnits = this.state[unit] === 10;
                  let dropType = unit;
                  if (
                    unit === "ones" &&
                    transitionUnit === "ones" &&
                    isTenUnits
                  ) {
                    dropType = "ones-group";
                  } else if (unit === "tens") {
                    dropType =
                      transitionUnit === "tens" && isTenUnits
                        ? "tens-group"
                        : "ones-group";
                  } else if (unit === "hundreds") dropType = "tens-group";
                  return (
                    <td key={i}>
                      <Droppable
                        droppableId={unit}
                        direction="horizontal"
                        type={dropType}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="days-in-school-droppable"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {this.renderUnits(unit)}
                            <div style={{ display: "none" }}>
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </td>
                  );
                })}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                {units.map((unit, i) => (
                  <th key={i}>{this.state[unit]}</th>
                ))}
              </tr>
            </tfoot>
          </table>
          <div className="text-center">
            <Droppable droppableId="droppableUnit" type="ones">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ height: "55px" }}
                >
                  <Draggable draggableId="unit" index={0} key="unit">
                    {(provided, snapshot) => (
                      <span
                        className="days-in-school-draggable-unitt"
                        ref={provided.innerRef}
                        onDoubleClick={this.handleDoubleClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={onesImg} alt="" />
                      </span>
                    )}
                  </Draggable>
                  <div style={{ display: "none" }}>{provided.placeholder}</div>
                </div>
              )}
            </Droppable>
            <Button
              variant="success"
              style={{ marginTop: "2em", width: "100px" }}
              onClick={this.reset}
            >
              Reset
            </Button>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default DaysInSchool;
