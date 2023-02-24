import React from "react";
import Header from "./Header";
import axios from "axios";
import "./index.css";

const wordsURL = "https://random-word-api.herokuapp.com/word?number=7";

class App extends React.Component {
  timeTmp = 0;
  lettersTmp = 0;
  errTmp = 0;
  constructor(props) {
    super(props);

    this.state = {
      lang: "Eng words",
      speed: null,
      err: null,
      printedText: "",
      textForPrint: "",
    }
    
    axios.get(wordsURL).then((response) => {
      this.setState({textForPrint: response.data.join(" ") + " "});
    });

    this.getWords = this.getWords.bind(this);
    this.printCheck = this.printCheck.bind(this);
  }

  render() {
    return (
    <div>
      <Header lang={this.state.lang} speed={this.state.speed} err={this.state.err} />
      <div className="inputBlock">
        <input className="typingLine" placeholder="print there" onChange={etc => this.printCheck(etc.target.value)}></input>
        <div className="text">
          <span className="printedText">{this.state.printedText}</span>
          <span className="textForPrint">{this.state.textForPrint}</span>
        </div>
      </div>
      
    </div>
    );
  }

  getWords() {
    axios.get(wordsURL).then((response) => {
      this.setState({printedText: ""});
      this.setState({textForPrint: response.data.join(" ") + " "});
    });
  }

  printCheck(value) {
    if (this.state.printedText.length === 0) {
      this.timeTmp = performance.now();
      this.lettersTmp = this.state.textForPrint.length;
    }
    if (value.length === this.state.printedText.length + 1 && value[value.length - 1] === this.state.textForPrint[0]) {
      this.setState({printedText: this.state.printedText + this.state.textForPrint[0]});
      this.setState({textForPrint: this.state.textForPrint.slice(1)});
      if (this.state.textForPrint.length === 1) {
        this.timeTmp = (performance.now() - this.timeTmp) / 60000;
        this.setState({err: this.errTmp});
        this.setState({speed: Math.floor(this.lettersTmp / this.timeTmp)});
        document.getElementsByClassName("typingLine")[0].value = "";
        this.getWords();
      }
    }
    else if (value.length === this.state.printedText.length && value === this.state.printedText) {
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    }
    else if (value.length < this.state.printedText.length) {
      this.setState({printedText: this.state.printedText.slice(0, value.length)});
      this.setState({textForPrint: this.state.printedText.slice(value.length) + this.state.textForPrint});
    }
    else {
      this.errTmp += 1;
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
  }

}

export default App;