import React from 'react';
import ChangeLangMenu from "./ChangeLangMenu";

function Header(props) {
  let f = props.changLang;
  return (
    <header>
      <div className="header-content">
        <h1 className="lang">{props.lang}</h1>
        <ChangeLangMenu changLang={f} />
        <span>
          <span className="typeStats">Скорость {props.speed !== "" ? props.speed : "--"}</span>
          <span className="typeStats">Ошибки {props.err !== "" ? props.err + "%" : "--"}</span>
        </span>
      </div>
    </header>);
}
export default Header;