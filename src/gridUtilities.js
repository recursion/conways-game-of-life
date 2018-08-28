/**************************************** */
/*              G - Grid Utilities
    functions / rulesets for creating/transforming grids
*/
const G = {
  create(size) {
    return this.seed(this.generate(size));
  },
  // iterate over grid and
  // randomly set cells to `live`
  seed(grid) {
    const nextGrid = grid.slice();
    const seed = (x, y, grid, cb) => {
      const nextGrid = grid.slice();
      if (cb) {
        return cb();
      } else {
        if (Math.random() > 0.82) {
          nextGrid[y][x] = "live";
        } else {
          nextGrid[y][x] = undefined;
        }
      }
      return nextGrid;
    };

    nextGrid.map((row, y) => {
      return row.map((cell, x) => {
        return seed(x, y, nextGrid);
      });
    });
    return nextGrid;
  },

  // toggle a cell state from/to `live`
  toggleCell(x, y, grid) {
    const nextGrid = grid.slice();
    if (nextGrid[y][x] === undefined) {
      nextGrid[y][x] = "live";
    } else {
      nextGrid[y][x] = undefined;
    }
    return nextGrid;
  },

  // generate grid of size `size`
  generate(size) {
    const grid = [];
    for (let y = 0; y < size.height; y++) {
      if (!grid[y]) grid[y] = [];
      for (let x = 0; x < size.width; x++) {
        grid[y][x] = undefined;
      }
    }
    return grid;
  },
  
  // update uses an async method to 
  // apply a ruleset to a grid
  // returns a promise that resolves to a grid
  update(ruleset, grid) {
    const processCell = (xIndex, yIndex, cell, grid) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(ruleset(xIndex, yIndex, cell, grid));
        }, 1);
      })
    }
    const processRow = (row, yIndex, i) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          // create a timeout for each row
          const cells = row.map((cell, xIndex) => {
            return processCell(xIndex, yIndex, cell, grid);
          });
          Promise.all(cells)
            .then((c) => {
              res(c);
            })
        }, 1);
      });
    }
    const processGrid = (grid) => {
      let i = 0;
      return grid.map((row, y) => {
          return processRow(row, y, i++);
      });
    }
    return new Promise((resolve, reject) => {
      Promise.all(processGrid(grid))
        .then((nextGrid) => {
          resolve(nextGrid);
        })
    });
  },
  
  // apply a ruleset to a grid
  // return the next grid
  apply(ruleset, grid) {
    return grid.map((row, y) => {
      return row.map((cell, x) => {
        return ruleset(x, y, cell, grid);
      });
    });
  },

  // count the number of 'live' cells bordering a given cell
  countLiveNeighbors(x, y, grid) {
    const height = grid.length;
    const width = grid[0].length;
    const size = { width, height };
    let count = 0;
    let row;
    
    let prevY = y - 1;
    let nextY = y + 1;
    let prevX = x - 1;
    let nextX = x + 1;
    
    if (prevY < 0) {
      prevY = size.height -1;
    }
    if (nextY >= size.height) {
     nextY = 0; 
    } 
    if (prevX < 0) {
      prevX = size.width - 1;
    }
    if (nextX >= size.width) {
      nextX = 0;
    }

    // count cells in previous row
    row = grid[prevY];
    if (row) {
      if (row[prevX] && row[prevX] === "live") {
        count++;
      }
      if (row[x] && row[x] === "live") {
        count++;
      }
      if (row[nextX] && row[nextX] === "live") {
        count++;
      }
    }
    // count cells in current row
    row = grid[y];
    if (row[prevX] && row[prevX] === "live") {
      count++;
    }
    if (row[nextX] && row[nextX] === "live") {
      count++;
    }
    // count cells in next row
    row = grid[nextY];
    if (row) {
      if (row[prevX] && row[prevX] === "live") {
        count++;
      }
      if (row[x] && row[x] === "live") {
        count++;
      }
      if (row[nextX] && row[nextX] === "live") {
        count++;
      }
    }
    return count;
  },
  
  // a ruleset takes (x, y, cell, grid)
  // and returns the next cell state for that coordinate
  // TODO: add more rulesets
  rulesets: {
    basic: (x, y, cell, grid) => {
      const count = G.countLiveNeighbors(x, y, grid);
      if (cell === "live") {
        if (count === 2 || count === 3) {
          return "live";
        } else {
          return undefined;
        }
      } else {
        if (count === 3) {
          return "live";
        } else {
          return undefined;
        }
      }
    }
  }
};
export default G;