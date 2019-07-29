import React, { useState } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import Button from "react-bootstrap/Button";

const DaysInSchool = ({ history, location, match }) => {
  const intialState = {
    hundreds: [],
    tens: [],
    ones: []
  };
  const [dropped, setDropped] = useState(intialState);

  const addDropped = (e, unit) => {
    setDropped({
      ...dropped,
      [unit]: [...dropped[unit], 1]
    });
  };

  const getCount = () => {
    let sum = 0;
    sum += dropped.hundreds.length * 100;
    sum += dropped.tens.length * 10;
    sum += dropped.ones.length * 1;

    return sum > 0 ? sum : null;
  };

  const reset = () => setDropped(intialState);

  const renderUnits = unit => {
    return dropped[unit].map((u, i) => (
      <span key={i} className="days-in-school-draggable-unit float-left">
        &nbsp;
      </span>
    ));
  };

  return (
    <div className="DaysInSchool">
      <h3 className="days-in-school">
        Today, we have been in school for{" "}
        <span className="days-in-school-num">{getCount()}</span> days!
      </h3>
      <div className="table-responsive">
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
              <td>
                <Droppable
                  types={["unit"]}
                  onDrop={e => addDropped(e, "hundreds")}
                >
                  <div className="days-in-school-droppable">
                    {renderUnits("hundreds")}
                  </div>
                </Droppable>
              </td>
              <td>
                <Droppable types={["unit"]} onDrop={e => addDropped(e, "tens")}>
                  <div className="days-in-school-droppable">
                    {renderUnits("tens")}
                  </div>
                </Droppable>
              </td>
              <td>
                <Droppable types={["unit"]} onDrop={e => addDropped(e, "ones")}>
                  <div className="days-in-school-droppable">
                    {renderUnits("ones")}
                  </div>
                </Droppable>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Draggable type="unit" data="unit">
          <span className="days-in-school-draggable-unit">&nbsp;</span>
        </Draggable>
        <Button
          variant="success"
          style={{ marginTop: "2em", width: "100px" }}
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default DaysInSchool;
