import React from 'react';

class KeyboardButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClass: "but",
    }
  }

  render() {
    return (
      <div className={this.state.nameClass}>
        <div className="bSymb1">{this.props.elem[0]}</div>
        <div className="bSymb2">{this.props.elem[1]}</div>
      </div>
    );
  }

  componentDidUpdate(prevProps) { // смотрит какую клавишу нужно нажать и подсвечивает ее если данная подходит
    if (prevProps.next[0] !== this.props.next[0]) {
      if (prevProps.next[0] === this.props.elem[1]) {
        this.setState({nameClass: "but"});
      }
      else if (this.props.next[0] === this.props.elem[1]) {
        this.setState({nameClass: "but helpEffect " + this.props.elem[2]});
      }
      else if (prevProps.next[0] === this.props.elem[0]) {
        this.setState({nameClass: "but"});
        if (this.props.elem[3] === "l") {
          document.getElementById("rShift").classList.toggle("h10");
          document.getElementById("rShift").classList.toggle("helpEffect");
        }
        else {
          document.getElementById("lShift").classList.toggle("h1");
          document.getElementById("lShift").classList.toggle("helpEffect");
        }
      }
      else if (this.props.next[0] === this.props.elem[0]) {
        this.setState({nameClass: "but helpEffect " + this.props.elem[2]});
        if (this.props.elem[3] === "l") {
          document.getElementById("rShift").classList.toggle("h10");
          document.getElementById("rShift").classList.toggle("helpEffect");
        }
        else {
          document.getElementById("lShift").classList.toggle("h1");
          document.getElementById("lShift").classList.toggle("helpEffect");
        }
      }
    }
  }
}

export default KeyboardButton;