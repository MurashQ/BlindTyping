import React from 'react';

class InputBlock extends React.Component {
  bs = false;
  constructor(props) {
    super(props);
    this.state = {
      timeTmp: 0,
      lettersTmp: 0,
      errTmp: 0
    }
    this.printCheck = this.printCheck.bind(this);
  }
  render() {
    return (
      <div className="inputBlock">
        <input className="typingLine" placeholder="" onChange={etc => this.printCheck(etc.target.value)}></input>
        <div className="text">
          <span className="printedText">{this.props.printed}</span>
          <span className="textForPrint">{this.props.forPrint}</span>
        </div>
      </div>
  )}

  printCheck(value) {
    let pl = this.props.printed.length;
    if (pl === 0 && this.bs === false) {
      this.setState({timeTmp: performance.now()});
      this.setState({errTmp: 0});
      this.setState({lettersTmp: this.props.forPrint.length});
    }
    if (value.slice(0, pl) === this.props.printed && value.slice(pl) === this.props.forPrint.slice(0, value.length - pl)) {
      this.props.setText(value, pl);
      if (this.props.forPrint.length === 1) {
        let tmp = (performance.now() - this.state.timeTmp) / 60000;
        this.props.endPrinting(Math.floor((this.state.errTmp/this.state.lettersTmp) * 10000)/100, Math.floor(this.state.lettersTmp / tmp));
        this.bs = false;
      }
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    }
    else if (value.length === pl && value === this.props.printed) {
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    }
    else if (value.length < pl) {
      this.props.backspaceInput(value);
      this.bs = true;
    }
    else {
      this.setState({errTmp: this.state.errTmp + 1});
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
  }
}

export default InputBlock;