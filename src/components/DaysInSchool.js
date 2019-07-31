import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";

const DaysInSchool = ({ history, location, match }) => {
  const intialState = {
    hundreds: [],
    tens: [],
    ones: []
  };

  const [dropped, setDropped] = useState(intialState);

  const addDropped = useCallback(
    unit => {
      setDropped({
        ...dropped,
        [unit]: [...dropped[unit], 1]
      });
    },
    [dropped]
  );

  const onDragEnd = useCallback(
    result => {
      const { destination, source } = result;
      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      addDropped(destination.droppableId);
    },
    [addDropped]
  );

  const getCount = () => {
    let sum = 0;
    sum += dropped.hundreds.length * 100;
    sum += dropped.tens.length * 10;
    sum += dropped.ones.length * 1;

    return sum > 0 ? sum : null;
  };

  const reset = () => setDropped(intialState);

  const renderUnits = unit => {
    return dropped[unit].map((u, i) => {
      const draggableId = `${unit}-${i}`;
      return (
        <Draggable
          draggableId={draggableId}
          index={i}
          key={draggableId}
          isDragDisabled={unit !== "ones"}
        >
          {(provided, snapshot) => (
            <span
              key={i}
              className="days-in-school-draggable-unit float-left"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              &nbsp;
            </span>
          )}
        </Draggable>
      );
    });
  };

  const hundredsLen = dropped.hundreds.length;
  const tensLen = dropped.tens.length;
  const onesLen = dropped.ones.length;

  return (
    <div className="DaysInSchool">
      <DragDropContext onDragEnd={onDragEnd}>
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
                {["hundreds", "tens", "ones"].map((category, i) => (
                  <td key={i}>
                    <Droppable droppableId={category} direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          className="days-in-school-droppable"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {renderUnits(category)}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </td>
                ))}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>{(hundredsLen && hundredsLen) || "-"}</th>
                <th>{(tensLen && tensLen) || "-"}</th>
                <th>{(onesLen && onesLen) || "-"}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="text-center">
          <Droppable droppableId="droppableUnit">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ height: "55px" }}
              >
                <Draggable draggableId="unit" index={0} key="unit">
                  {(provided, snapshot) => (
                    <span
                      className="days-in-school-draggable-unit"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      &nbsp;
                    </span>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Button
            variant="success"
            style={{ marginTop: "2em", width: "100px" }}
            onClick={reset}
          >
            Reset
          </Button>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DaysInSchool;
