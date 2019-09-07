import React, { PureComponent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { storageTest } from "../utils/localStorage";
import sunny from "../sunny.svg";
import cloudy from "../cloudy.svg";
import rainy from "../rainy.svg";
import snowy from "../snowy.svg";
import winter from "../winter.svg";
import spring from "../sping.svg";
import summer from "../summer.svg";
import fall from "../fall.svg";

class WeatherGraph extends PureComponent {
  initCellsClicked = {};

  state = {
    cellsClicked: this.initCellsClicked,
    season: null,
    weather: null
  };

  hasLocalStorageSupport = storageTest();

  componentDidMount() {
    if (this.hasLocalStorageSupport) {
      const storedClicks = localStorage.getItem("weatherGraphCellsClicked");
      if (storedClicks)
        this.setState({ cellsClicked: JSON.parse(storedClicks) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cellsClicked } = this.state;

    if (this.hasLocalStorageSupport)
      localStorage.setItem(
        "weatherGraphCellsClicked",
        JSON.stringify(cellsClicked)
      );
  }

  weatherNameByColumn = col => {
    let weatherName;
    switch (col + 1) {
      case 1:
        weatherName = "sunny";
        break;
      case 2:
        weatherName = "cloudy";
        break;
      case 3:
        weatherName = "rainy";
        break;
      case 4:
        weatherName = "snowy";
        break;
      default:
        weatherName = "unknown";
    }

    return weatherName;
  };

  cellColorByWeather = weather => {
    const cellColor = {
      sunny: "#ffff7f",
      cloudy: "#038fff",
      rainy: "#1ed760",
      snowy: "#f14517"
    };

    return cellColor[weather];
  };

  handleCellClicked = e => {
    const cell = e.target;
    const cellId = cell.id;
    const isSelected = this.state.cellsClicked[cellId] === true;
    this.setState({
      cellsClicked: { ...this.state.cellsClicked, [cellId]: !isSelected }
    });
  };

  resetCellsClicked = () =>
    this.setState({ cellsClicked: this.initCellsClicked });

  genTableBody = () => {
    const tableRow = [...Array(4).keys()];
    const tableCells = [];
    [...Array(8).keys()].forEach(row => tableCells.push(tableRow));
    return tableCells.map((row, r) => {
      return (
        <tr key={r}>
          {row.map((cell, c) => {
            const weatherName = this.weatherNameByColumn(c);
            const cellId = `${r}-${c}`;
            return (
              <td
                id={cellId}
                key={c}
                onClick={this.handleCellClicked}
                style={{
                  background: this.state.cellsClicked[cellId]
                    ? this.cellColorByWeather(weatherName)
                    : "white"
                }}
              >
                &nbsp;
              </td>
            );
          })}
        </tr>
      );
    });
  };

  addDropped = (id, source) => {
    this.setState({
      [source]: id
    });
  };

  onDragEnd = result => {
    const { destination, draggableId, source } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) return;

    this.addDropped(draggableId, source.droppableId);
  };

  setSeason = e => this.setState({ season: e.target.id });
  clearSeason = () => this.setState({ season: null });

  setWeather = e => this.setState({ weather: e.target.id });
  clearWeather = () => this.setState({ weather: null });

  capitalizeFirst = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { season, weather } = this.state;
    return (
      <div className="WeatherGraph">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="text-right">
            <Link className="btn btn-sm btn-success" to="/days-in-school">
              Next Game >
            </Link>
          </div>
          <h3 className="page-header">Weather Graph</h3>
          <table className="weather-table table table-bordered table-sm">
            <tfoot>
              <tr>
                <th scope="col">
                  <img
                    src={sunny}
                    alt="Sunny icon"
                    style={{
                      width: "40px",
                      height: "auto"
                    }}
                  />
                  <br />
                  Sunny
                </th>
                <th scope="col">
                  <img
                    src={cloudy}
                    alt="Cloudy icon"
                    style={{
                      width: "40px",
                      height: "auto"
                    }}
                  />
                  <br />
                  Cloudy
                </th>
                <th scope="col">
                  <img
                    src={rainy}
                    alt="Rainy icon"
                    style={{
                      width: "40px",
                      height: "auto"
                    }}
                  />
                  <br />
                  Rainy
                </th>
                <th scope="col">
                  {" "}
                  <img
                    src={snowy}
                    alt="Snowy icon"
                    style={{
                      width: "40px",
                      height: "auto"
                    }}
                  />
                  <br />
                  Snowy
                </th>
              </tr>
            </tfoot>
            <tbody>{this.genTableBody()}</tbody>
          </table>
          <div className="text-center">
            <Button
              variant="success"
              style={{ marginTop: "4px" }}
              onClick={this.resetCellsClicked}
            >
              Reset Graph
            </Button>
            <div
              className="border rounded"
              style={{ marginTop: "20px", padding: "8px" }}
            >
              <h3>
                The season is{" "}
                <Droppable
                  droppableId="droppableSeason"
                  type="season"
                  isDragDisabled={true}
                >
                  {(provided, snapshot) => (
                    <span
                      className="fill-in-the-blank"
                      style={{
                        width: "160px",
                        color: "#28a745"
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {season && (
                        <span
                          className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                          style={{ cursor: "pointer" }}
                          onDoubleClick={this.clearSeason}
                        >
                          <img
                            src={
                              season === "winter"
                                ? winter
                                : season === "spring"
                                ? spring
                                : season === "summer"
                                ? summer
                                : fall
                            }
                            alt={`${season} icon`}
                            style={{
                              width: "30px",
                              height: "auto"
                            }}
                          />
                          {` ${this.capitalizeFirst(season)}`}
                        </span>
                      )}
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </span>
                  )}
                </Droppable>
              </h3>
              <h3 style={{ marginTop: "20px" }}>
                The weather is{" "}
                <Droppable
                  droppableId="droppableWeather"
                  type="weather"
                  isDragDisabled={true}
                >
                  {(provided, snapshot) => (
                    <span
                      className="fill-in-the-blank"
                      style={{
                        width: "160px",
                        color: "#007bff"
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {weather && (
                        <span
                          className="weather-draggable border border-primary rounded p-1 mr-2 border-2"
                          style={{ cursor: "pointer" }}
                          onDoubleClick={this.clearWeather}
                        >
                          <img
                            src={
                              weather === "sunny"
                                ? sunny
                                : weather === "cloudy"
                                ? cloudy
                                : weather === "rainy"
                                ? rainy
                                : cloudy
                            }
                            alt={`${weather} icon`}
                            style={{
                              width: "30px",
                              height: "auto"
                            }}
                          />
                          {` ${this.capitalizeFirst(weather)}`}
                        </span>
                      )}
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </span>
                  )}
                </Droppable>
              </h3>
              <div
                className="mx-auto text-center"
                style={{ padding: "8px", marginTop: "32px" }}
              >
                <Droppable
                  droppableId="season"
                  type="season"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      className="weather-droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Draggable draggableId="winter" index={0}>
                        {(provided, snapshot) => (
                          <span
                            id="winter"
                            onDoubleClick={this.setSeason}
                            className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={winter}
                              alt="Winter icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Winter
                          </span>
                        )}
                      </Draggable>
                      <Draggable draggableId="spring" index={1}>
                        {(provided, snapshot) => (
                          <span
                            id="spring"
                            onDoubleClick={this.setSeason}
                            className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={spring}
                              alt="Spring icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Spring
                          </span>
                        )}
                      </Draggable>
                      <Draggable draggableId="summer" index={2}>
                        {(provided, snapshot) => (
                          <span
                            id="summer"
                            onDoubleClick={this.setSeason}
                            className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={summer}
                              alt="Summer icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Summer
                          </span>
                        )}
                      </Draggable>
                      <Draggable draggableId="fall" index={3}>
                        {(provided, snapshot) => (
                          <span
                            id="fall"
                            onDoubleClick={this.setSeason}
                            className="weather-draggable border border-success rounded p-1 mr-2 border-2"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={fall}
                              alt="Fall icon"
                              style={{
                                width: "30px",
                                height: "auto",
                                marginLeft: "-12px"
                              }}
                            />
                            Fall
                          </span>
                        )}
                      </Draggable>
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>

                <Droppable
                  droppableId="weather"
                  type="weather"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      className="weather-droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Draggable draggableId="sunny" index={0}>
                        {(provided, snapshot) => (
                          <span
                            id="sunny"
                            className="weather-draggable border border-primary rounded p-1 mr-2 border-2"
                            onDoubleClick={this.setWeather}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={sunny}
                              alt="Sunny icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Sunny
                          </span>
                        )}
                      </Draggable>
                      <Draggable draggableId="cloudy" index={1}>
                        {(provided, snapshot) => (
                          <span
                            id="cloudy"
                            className="weather-draggable border border-primary rounded p-1 mr-2 border-2"
                            onDoubleClick={this.setWeather}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={cloudy}
                              alt="Cloudy icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Cloudy
                          </span>
                        )}
                      </Draggable>
                      <Draggable draggableId="rainy" index={2}>
                        {(provided, snapshot) => (
                          <span
                            id="rainy"
                            className="weather-draggable border border-primary rounded p-1 mr-2 border-2"
                            onDoubleClick={this.setWeather}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={rainy}
                              alt="Rainy icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Rainy
                          </span>
                        )}
                      </Draggable>
                      <Draggable draggableId="snowy" index={3}>
                        {(provided, snapshot) => (
                          <span
                            id="snowy"
                            className="weather-draggable border border-primary rounded p-1 mr-2 border-2"
                            onDoubleClick={this.setWeather}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <img
                              src={snowy}
                              alt="Snowy icon"
                              style={{
                                width: "30px",
                                height: "auto"
                              }}
                            />{" "}
                            Snowy
                          </span>
                        )}
                      </Draggable>
                      <div style={{ display: "none" }}>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default WeatherGraph;
