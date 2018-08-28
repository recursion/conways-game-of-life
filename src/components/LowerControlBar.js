import React from 'react';
import ControlButton from './ControlButton';
import Help from './Help';

export default class LowerControlBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      helpMenuActive: false
    };
  }
  render() {
    return (
      <nav className="navbar gridbar is-transparent">
        <div className="navbar-brand">
          <ControlButton 
            name="Reset" 
            icon="fa-refresh" 
            clickHandler={this.props.controls.reset}
          />
          <ControlButton 
            name="Seed" 
            icon="fa-braille" 
            clickHandler={() => {
              this.props.controls.reset();
              this.props.controls.seed();
            }}
          />
          <div className="navbar-item">
            <a
              className={`btn btn-default ${this.props.size === 1 ? 'has-text-danger' : ''}`}
              aria-label="Small">
              <i
                className="fa fa-2x"
                onClick={() => {
                  // reset and reseed the game.
                  console.log('-> ', this.props.size);
                  this.props.controls.setSize('small');
                }}
                >1</i>
            </a>
          </div>
          <div className="navbar-item">
            <a 
              className={`btn btn-default ${this.props.size === 2 ? 'has-text-danger' : ''}`}
              aria-label="Medium">
              <i
                className="fa fa-2x"
                onClick={() => {
                  // reset and reseed the game.
                  this.props.controls.setSize('medium');
                }}
                >2</i>
            </a>
          </div>
          <div className="navbar-item">
            <a 
              className={`btn btn-default ${this.props.size === 4 ? 'has-text-danger' : ''}`}
              aria-label="Large">
              <i
                className="fa fa-2x"
                onClick={() => {
                  // reset and reseed the game.
                  this.props.controls.setSize('large');
                }}
                >3</i>
            </a>
          </div>
          <div className="navbar-item">
            <a 
              className={`btn btn-default ${this.props.size === 8 ? 'has-text-danger' : ''}`}
              aria-label="Giant">
              <i
                className="fa fa-2x"
                onClick={() => {
                  // reset and reseed the game.
                  this.props.controls.setSize('giant');
                }}
                >4</i>
            </a>
          </div>
          <ControlButton 
            name="Help" 
            icon="fa-question-circle" 
            clickHandler={() => {
              this.setState({helpMenuActive: !this.state.helpMenuActive})
            }}
          />
        </div>
        <Help 
          isActive={this.state.helpMenuActive} 
          activateIntro={this.props.activateIntro}
          clickHandler={() => {
            this.setState({helpMenuActive: !this.state.helpMenuActive})
          }} />
      </nav>
    );
  }
}