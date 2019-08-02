import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import sunny from "../sunny.svg";
import cloudy from "../cloudy.svg";
import rainy from "../rainy.svg";
import snowy from "../snowy.svg";

class WeatherGraph extends PureComponent {
  initCellsClicked = {};

  state = {
    cellsClicked: this.initCellsClicked
  };

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
      sunny: "orange",
      cloudy: "lightgray",
      rainy: "dodgerblue",
      snowy: "deepskyblue"
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
    [...Array(10).keys()].forEach(row => tableCells.push(tableRow));
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

  render() {
    return (
      <div className="WeatherGraph">
        <h3 className="days-in-school">Weather Graph</h3>
        <table className="table table-bordered table-sm">
          <tfoot>
            <tr>
              <th scope="col">
                <img
                  src={sunny}
                  alt="Sunny icon"
                  style={{
                    width: "50px",
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
                    width: "50px",
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
                    width: "50px",
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
                    width: "50px",
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
            style={{ marginTop: "2em", width: "100px" }}
            onClick={this.resetCellsClicked}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default WeatherGraph;
