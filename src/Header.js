import React from 'react';
import ChangeLangMenu from "./ChangeLangMenu";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      f: props.changLang,
    }
  }
  render() {
    return (
      <header>
        <div className="header-content">
          <h1 className="lang">{this.props.lang}</h1>
          <ChangeLangMenu changLang={this.state.f} />
          <span>
            <span className="typeStats">Скорость {this.props.speed !== "" ? this.props.speed : "--"}</span>
            <span className="typeStats">Ошибки {this.props.err !== "" ? this.props.err + "%" : "--"}</span>
          </span>
        </div>
      </header>);
  }
}
export default Header;