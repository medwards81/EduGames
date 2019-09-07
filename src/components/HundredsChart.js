import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { storageTest } from "../utils/localStorage";

class HundredsChart extends PureComponent {
  initState = {
    numberOfDaysCellSelected: null,
    hiddenCells: [],
    cellState: null,
    is100Selected: false
  };

  state = this.initState;

  hasLocalStorageSupport = storageTest();

  clickTimeout = null;

  reset = () => this.setState(this.initState);

  componentDidMount() {
    if (this.hasLocalStorageSupport) {
      const numberOfDaysCellClicked = localStorage.getItem(
        "hundredsChartNumDaysCellClicked"
      );
      if (numberOfDaysCellClicked)
        this.setState({
          numberOfDaysCellSelected: numberOfDaysCellClicked,
          cellState: "highlight"
        });
      const isCell100Clicked = localStorage.getItem(
        "hundredsChartIsDay100Clicked"
      );
      if (isCell100Clicked && JSON.parse(isCell100Clicked) === true)
        this.setState({
          is100Selected: true,
          cellState: "cell100"
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { numberOfDaysCellSelected, is100Selected } = this.state;
    if (this.hasLocalStorageSupport) {
      localStorage.setItem(
        "hundredsChartNumDaysCellClicked",
        numberOfDaysCellSelected
      );
      localStorage.setItem("hundredsChartIsDay100Clicked", is100Selected);
    }
  }

  componentWillUnmount() {
    this.clickTimeout = null;
  }

  handleCellClicked = e => {
    const { numberOfDaysCellSelected, hiddenCells, is100Selected } = this.state;
    const cellId = e.target.id || e.target.offsetParent.id; // based on cell or number click
    const newState = {};
    const cell100 = "9-9";
    if (hiddenCells.includes(cellId)) {
      const updatedHiddenCells = hiddenCells.filter(cell => cell !== cellId);
      newState.hiddenCells = updatedHiddenCells;
      newState.cellState = "clear";
    } else if (numberOfDaysCellSelected === cellId) {
      newState.numberOfDaysCellSelected = null;
      newState.cellState = "clear";
    } else if (is100Selected && cellId === cell100) {
      newState.is100Selected = false;
      newState.cellState = "clear";
    } else if (cellId === cell100) {
      newState.is100Selected = true;
      newState.cellState = "cell100";
    } else {
      newState.numberOfDaysCellSelected = cellId;
      newState.cellState = "highlight";
    }
    this.setState({ ...this.state, ...newState });
  };

  handleCellDoubleClicked = e => {
    const { hiddenCells } = this.state;
    const cellId = e.target.id || e.target.offsetParent.id;

    this.setState({
      hiddenCells: [...hiddenCells, cellId],
      cellState: "hide"
    });
  };

  handleClicks = e => {
    e.persist(); // allows event to exist so that we can pass it in the setTimeouts
    if (this.clickTimeout !== null) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.handleCellDoubleClicked(e);
    } else {
      this.clickTimeout = setTimeout(() => {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
        this.handleCellClicked(e);
      }, 200);
    }
  };

  genTableBody = () => {
    const { numberOfDaysCellSelected, hiddenCells, is100Selected } = this.state;

    const tableRow = [...Array(10).keys()];
    const tableCells = [];
    [...Array(10).keys()].forEach(row => tableCells.push(tableRow));
    return tableCells.map((row, r) => {
      let currentNum = r * 10;
      return (
        <tr key={r}>
          {row.map((cell, c) => {
            const cellId = `${r}-${c}`;
            const isSelected = numberOfDaysCellSelected === cellId;
            const isHidden = hiddenCells.includes(cellId);
            const isCell100Selected = is100Selected && cellId === "9-9";
            return (
              <td
                id={cellId}
                key={c}
                onClick={this.handleClicks}
                style={{
                  background: isSelected
                    ? "yellow"
                    : isHidden
                    ? "lightgray"
                    : isCell100Selected
                    ? "red"
                    : "white",
                  color: isHidden ? "lightgray" : "inherit"
                }}
              >
                <span className={`number ${isHidden ? "invisible" : ""}`}>
                  {++currentNum}
                </span>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="HundredsChart">
        <div className="text-right">
          <Link className="btn btn-sm btn-success" to="/morning/poem">
            Next Game >
          </Link>
        </div>
        <h3 className="page-header">Hundreds Chart</h3>
        <table className="hundreds-chart table table-bordered">
          <tbody>{this.genTableBody()}</tbody>
        </table>
        <div className="text-center">
          <Button
            variant="success"
            style={{ marginTop: "1em", width: "100px" }}
            onClick={this.reset}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default HundredsChart;
