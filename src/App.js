import React from "react";
import Header from "./Header";
import axios from "axios";
import "./index.css";

const wordsURL = "https://random-word-api.herokuapp.com/word?number=6";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: "Eng",
      speed: null,
      err: null,
      printedText: "",
      textForPrint: ""
    }
    
    axios.get(wordsURL).then((response) => {
      this.setState({textForPrint: response.data.join(" ")});
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
      this.setState({textForPrint: response.data.join(" ")});
    });
  }

  printCheck(value){
    console.log(value);
  }

}

export default App;