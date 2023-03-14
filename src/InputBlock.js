import React from 'react';

class InputBlock extends React.Component {
  render() {
    return (
      <div className="inputBlock">
        <input className="typingLine" placeholder="" onChange={etc => this.props.printCheck(etc.target.value)}></input>
        <div className="text">
          <span className="printedText">{this.props.printed}</span>
          <span className="textForPrint">{this.props.forPrint}</span>
        </div>
      </div>
  )}
}

export default InputBlock;