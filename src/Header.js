import React from 'react';

function Header(props) {
  return (
    <header className="container">
      <div className="header-content">
        <span className="lang">{props.lang}</span>
          <span>
            <span className="typeStats">speed {props.speed !== null ? props.speed : "--"}</span>
            <span className="typeStats">errors {props.err !== null ? props.err : "--"}</span>
          </span>
      </div>
    </header>);
}
export default Header;