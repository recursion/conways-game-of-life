import React from 'react';
import log from '../log';

const Grid = (props) => {
  const renderRow = (row, rowIndex) => (
    <div className="grid_row" key={rowIndex}>
      {row.map((cell, cellIndex) => {
        return renderCell(cell, cellIndex, rowIndex, props.cellSize); 
      })}
    </div>
  );
  const renderCell = (cell, cellIndex, rowIndex, cellSize) => (
    <div
      key={`${cellIndex}:${rowIndex}`}
      className={`cell ${cell === "live" ? " live" : ""}`}
      style={{width: props.size, height: props.size}}
      onClick={() => {
        log('Cell Info: ', rowIndex, cellIndex, cell);
         props.toggleCell(rowIndex, cellIndex);
      }}
    />
  );
  return (
    <div
      className="grid">
      {props.grid.map((row, i) => {
        return renderRow(row, i);
      })}
    </div>
  );
}

export default Grid;