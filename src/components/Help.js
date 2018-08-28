import React from 'react';

const Help = props => {
  return (
    <div 
      className={`modal ${props.isActive? "is-active" : ""}`}>
      <div 
        className="modal-background"
        onClick={() => props.clickHandler() } 
      >
      </div>
      <div className="modal-content">
        <h5 className="subtitle has-text-centered">
          Game Controls
        </h5>
        <div className="help_info">
          <i
            className="fa fa-play fa-2x"
            aria-hidden="true"
          />
          <label className="help_info_name">
            Play - Start updating the grid.
          </label>
        </div>
        <div className="help_info">
          <i
            className="fa fa-pause fa-2x"
            aria-hidden="true"
          />
          <label className="help_info_name">
            Pause - Stop updating the grid.
          </label>
        </div>
        <div className="help_info">
          <i
            className="fa fa-refresh fa-2x"
            aria-hidden="true"
          />
          <label className="help_info_name">
           Reset - Reset generations and clear the grid.
          </label>
        </div>
        <div className="help_info">
          <i
            className="fa fa-braille fa-2x"
            aria-hidden="true"
          />
          <label className="help_info_name">
            Seed - Randomly seed the grid with cells. Reset's generations.
          </label>
        </div>
        <div className="help_info">
          <div className="help_legend_icon">
            <i
              className="fa fa-angle-double-left fa-2x"
              aria-hidden="true"
            />
            <span className="fa icon_text">Speed</span>
            <i
              className="fa fa-angle-double-right fa-2x"
              aria-hidden="true"
            />
          </div>
          <label className="help_info_name">
            Speed - Change game speed.
          </label>
        </div>
        <div className="help_info">
          <div className="help_legend_icon">
            <i className="fa fa-2x" >1</i>
            <i className="fa fa-2x" >2</i>
            <i className="fa fa-2x" >3</i>
            <i className="fa fa-2x" >4</i>
          </div>
          <label className="help_info_name">
            Size - Change cell size. Causes a full reset.
          </label>
        </div>
        <br />
        <h5 className="subtitle has-text-centered">
          <a
            onClick={() => {
              props.clickHandler();
              props.activateIntro();
            }}>
          About Conway's Game of Life.
          </a>
        </h5>
        
      </div>
      <button 
        className="modal-close is-large" 
        onClick={props.clickHandler}
        aria-label="close">
      </button>
    </div>  
  );
}

export default Help;