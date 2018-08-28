import React from 'react';
import ControlButton from './ControlButton';

export default class UpperControlBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      infoMenuActive: false
    };
  }
  render() {
    const SpeedControls = ({name, icon, clickHandler}) => {
      return (
        <div className="navbar-item">
          <a className="btn btn-default" aria-label="Slower">
            <i
              className="fa fa-angle-double-left fa-3x"
              onClick={() => this.props.controls.decrementSpeed('slower')}
              aria-hidden="true"
            />
          </a>
          <span className="speed__info">
            {
              ['Slow', 'Normal', 'Fast'][this.props.speed]
            }
          </span>
          <a className="btn btn-default" aria-label="Faster">
            <i
              className="fa fa-angle-double-right fa-3x"
              onClick={() => this.props.controls.incrementSpeed('faster')}
              aria-hidden="true"
            />
          </a>
        </div>
      );
    }

    const Generations = props => {
      return (
        <div className="navbar-item">
          <a className="btn btn-default" aria-label="Generations">
            <i
              className="fa generations__info"
              onClick={() => {
                // reset and reseed the game.
                this.setState({infoMenuActive: !this.state.infoMenuActive})
              }}
              >{this.props.generations}</i>
          </a>
        </div>
      );
    };
    
    return (
      <nav className="navbar playbar is-transparent">
        <div className="navbar-brand">
          <h3 className="navbar-item identity is-hidden-touch">
            Conways Game of Life
          </h3>
          <SpeedControls />
          <Generations />
          { !this.props.playing ?
            <ControlButton 
              name="Play" 
              icon="fa-play" 
              clickHandler={this.props.controls.play} 
            />
            :
            <ControlButton 
              name="Pause" 
              icon="fa-pause" 
              clickHandler={this.props.controls.pause}
            />
          }
        </div>
      </nav>
    );
  }
}