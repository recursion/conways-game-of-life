import React from 'react';
import UpperControlBar from './components/UpperControlBar';
import LowerControlBar from './components/LowerControlBar';
import Grid from './components/Grid';
import Intro from './components/Intro';
import G from './gridUtilities';
import './App.css';

// used to set game speed (update delay)
const DELAYS = [750, 325, 80];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruleset:  G.rulesets.basic,
      introActive: true,
      play: false,
      cellSize: 10,
      size: 1,
      speed: 1,
      grid: [],
      tick: 0
    };
    this.dimension = this.dimension.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.incrementSpeed = this.incrementSpeed.bind(this);
    this.decrementSpeed = this.decrementSpeed.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.setSize = this.setSize.bind(this);
    this.seed = this.seed.bind(this);
    this.update = this.update.bind(this);
    // group all controls into one object
    // to easier pass them to children components
    this.controls = {
      play: this.play,
      pause: this.pause,
      reset: this.reset,
      seed: this.seed,
      incrementSpeed: this.incrementSpeed,
      decrementSpeed: this.decrementSpeed,
      setSize: this.setSize
    };
  }
  componentDidMount() {
    // set up our grid/cell sizes
    this.dimension();
    // re-dimension when window resizes;
    window.addEventListener("resize", () => {
      this.dimension();
    });
  }
  update() {
    if (this.state.play) {
      setTimeout(() => {
        G.update(this.state.ruleset, this.state.grid)
          .then((grid) => {
            if (this.state.play) {
              this.setState({
                grid: grid,
                tick: this.state.tick + 1
              }, this.update);
            }
        })
      }, DELAYS[this.state.speed]);
    }
    /*
    setTimeout(() => {
      if (this.state.play) {
        this.setState({
          grid: G.apply(this.state.ruleset, this.state.grid),
          tick: this.state.tick + 1
        }, this.update);
      }
    }, DELAYS[this.state.speed]);
    */
  }
  dimension() {
    // calculate grid/cell sizes based on the container size
    
    // TODO: calculate a cell size that evenly fits both axis 
    
    // element reference
    const el = this.divEl;
    
    const containerSize = {
      width: el.offsetWidth, 
      // subtract for codepen footer
      height: el.offsetHeight - 55 
    };
    
    const cellSize = {
      width: this.state.size * this.state.cellSize,
      height: this.state.size * this.state.cellSize
    };
    
    const calcGridSize = (n, x) => {
      const width = Math.floor(n.width / x.width);
      const height = Math.floor(n.height / x.height);
      return {width, height};
    }
   
    const gridSize = calcGridSize(containerSize, cellSize);
    
    const grid = G.create(gridSize);
    
    this.setState({ grid });
  }
  render() {
    return (
      <div 
        ref={(input) => this.divEl = input}
        className="app">
        <UpperControlBar
          controls={this.controls}
          speed={this.state.speed}
          generations={this.state.tick}
          playing={this.state.play}
        />
        <Grid
          toggleCell={this.toggleCell}
          grid={this.state.grid}
          tick={this.state.tick}
          size={this.state.size * this.state.cellSize}
        />
        <LowerControlBar
          controls={this.controls}
          size={this.state.size}
          activateIntro={() => {
            this.setState({introActive: !this.state.introActive})
          }}
        />
        <Intro 
          isActive={this.state.introActive} 
          clickHandler={() => {
            this.setState({introActive: !this.state.introActive})
          }} />
      </div>
    );
  }
  
  //  Controls and Settings
  toggleCell(y, x) {
    const grid = G.toggleCell(x, y, this.state.grid);
    this.setState({ grid });
  }
  incrementSpeed() {
    if (this.state.speed < DELAYS.length - 1) {
      this.setState({speed: this.state.speed + 1});
    }
  }
  decrementSpeed() {
    if (this.state.speed > 0) {
      this.setState({speed: this.state.speed - 1});
    }
  }
  
  setSize(size) {
    switch (size) {
      case 'small':
        size = 1;
        break;
      case 'medium': 
        size = 2;
        break;
      case 'large':
        size = 4;
        break;
      case 'giant':
        size = 8;
        break;
      default:
        console.error('Unknown size: ', size);
        console.error('Size remaining unchanged at: ', this.state.size);
        size = 2;
        break;
    }
    this.setState({size, tick: 0, play: false}, this.dimension);
  }
  play() {
    if (!this.state.play) {
      this.setState({ play: true}, this.update);
    }
  }
  pause() {
    this.setState({ play: false });
  }
  reset() {
    const width = this.state.grid[0].length;
    const height = this.state.grid.length;
    
    const grid = G.generate({width, height});
    this.setState({ 
      tick: 0, 
      play: false,
      grid
    });
  }
  seed() {
    this.setState({grid: G.seed(this.state.grid)})
  }
}



