import React from 'react';

const ControlButton = ({name, icon, clickHandler}) => {
  return (
    <div className="navbar-item">
      <a className="btn btn-default" aria-label={name}>
        <i
          className={`fa ${icon} fa-2x`}
          onClick={clickHandler}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
export default ControlButton;