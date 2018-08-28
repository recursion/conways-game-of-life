import React from 'react';

const Intro = props => {
  return (
    <div 
      className={`modal ${props.isActive? "is-active" : ""}`}>
      <div 
        className="modal-background"
        onClick={() => props.clickHandler() } 
      >
      </div>
      
      <div 
        className="modal-content"
        onClick={() => props.clickHandler() } >
        <h5 className="subtitle has-text-centered">
          Conway's Game of Life!
        </h5>
        <figure className="image is-128x128 pull-right">
          <img alt="Gosper Gliders" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gospers_glider_gun.gif/220px-Gospers_glider_gun.gif" />
        </figure>
        <p className="is-size-6"><i>The cellular automaton</i> game.</p> 
        <br />
        <p>Generate random grids or create your own patterns and watch them play out in this javascript/react implementation of Conways Game of life!
        </p>
        <br />
        <a
          className="navbar-item"
          href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">
          Click here to for the wikipedia page. Click anywhere else to start!
        </a>
      </div>
    </div>
  );
}
export default Intro;