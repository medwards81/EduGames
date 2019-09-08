import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class HundredsChart extends PureComponent {
  handleCellClick = event => {
    const tdEle = event.target;
    const numberEle = tdEle.querySelector(".number");
    if (numberEle) numberEle.classList.toggle("invisible");
  };

  handleNumberClick = event => {
    event.preventDefault();
    const numberEle = event.target;
    numberEle.classList.toggle("invisible");
  };

  genTableBody = () => {
    const tableRow = [...Array(10).keys()];
    const tableCells = [];
    [...Array(10).keys()].forEach(row => tableCells.push(tableRow));
    return tableCells.map((row, r) => {
      let currentNum = r * 10;
      return (
        <tr key={r}>
          {row.map((cell, c) => {
            const cellId = `${r}-${c}`;
            return (
              <td id={cellId} key={c} onClick={this.handleCellClick}>
                <span className="number" onClick={this.handleNumberClick}>
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
        <h3 className="page-header" style={{ marginTop: "2em" }}>
          Hundreds Chart
        </h3>
        <table className="hundreds-chart table table-bordered">
          <tbody>{this.genTableBody()}</tbody>
        </table>
      </div>
    );
  }
}

export default HundredsChart;
