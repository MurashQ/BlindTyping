import React from 'react';

function Header(props) {
  return (
    <header>
      <div className="header-content">
        <span className="lang">{props.lang}</span>
          <span>
            <span className="typeStats">Скорость {props.speed !== null ? props.speed : "--"}</span>
            <span className="typeStats">Ошибки {props.err !== null ? props.err + "%" : "--"}</span>
          </span>
      </div>
    </header>);
}
export default Header;