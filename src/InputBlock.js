import React from 'react';

class InputBlock extends React.Component {
  bs = false; //Показывает был ли нажат Backspace при текущем наборе слов
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

  printCheck(value) { //следит за вводом в input
    let pl = this.props.printed.length; //Скоращение
    if (pl === 0 && this.bs === false) { //При печати первого символа в input
      this.setState({timeTmp: performance.now()}); //начальное время
      this.setState({errTmp: 0});  //начальное количество ошибок
      this.setState({lettersTmp: this.props.forPrint.length}); //изначальная длинна строки для ввода
      this.bs = true;
    }
    if (value.slice(0, pl) === this.props.printed && value.slice(pl) === this.props.forPrint.slice(0, value.length - pl)) {
      this.props.setText(value, pl); //строка для печати полностью введена
      if (this.props.forPrint.length === 1) {
        let tmp = (performance.now() - this.state.timeTmp) / 60000; //передает скорость печати слов/минуту и количество опечаток относительно длинны текста для печати
        this.props.endPrinting(Math.floor((this.state.errTmp/this.state.lettersTmp) * 10000)/100, Math.floor(this.state.lettersTmp / tmp));
        this.bs = false; //сбрасывается backspace
      }
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    }
    else if (value.length === pl && value === this.props.printed) { //содержимое ввода вернулось в положение без ошибок
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
      this.bs = true; //явно был нажат Backspace
    }
    else if (value.length < pl) { //стерт правильно написанный текст
      this.props.backspaceInput(value);
      this.bs = true;
    }
    else { //была допущена ошибка при вводе
      this.setState({errTmp: this.state.errTmp + 1});
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
  }
}

export default InputBlock;