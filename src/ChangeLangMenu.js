import React from 'react';

class ChangeLangMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      e1: "English words",
      r1: "Русские слова",
      r2: "Русский текст"
    }
  }

  render () {
    return (
      <div className="dropdownContainer">
        <div className="dropdown">
          <div className="dropbtn">Выбрать язык</div>
          <div className="dropdown-content">
            <p onClick={() => this.props.changLang(this.state.e1)}>English words</p>
            <p onClick={() => this.props.changLang(this.state.r1)}>Русские слова</p>
            <p onClick={() => this.props.changLang(this.state.r2)}>Русский текст</p>
          </div>
        </div>
      </div>
  )}
    
}

export default ChangeLangMenu;