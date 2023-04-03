import React from 'react';

function Header(props) {
  return (
    <header>
      <div className="header-content">
        <h1 className="lang">{props.lang}</h1>
        <span>
          <span className="typeStats">Скорость {props.speed !== "" ? props.speed : "--"}</span>
          <span className="typeStats">Ошибки {props.err !== "" ? props.err + "%" : "--"}</span>
        </span>
      </div>
    </header>);
}
export default Header;