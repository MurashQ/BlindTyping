import React from 'react';

function Header(props) {
  return (
    <header>
      <div className="header-content">
        <h1 className="lang">{props.lang}</h1>
        <span>
          <span className="typeStats">Скорость {props.speed !== null ? props.speed : "--"}</span>
          <span className="typeStats">Ошибки {props.err !== null ? props.err + "%" : "--"}</span>
        </span>
      </div>
    </header>);
}
export default Header;