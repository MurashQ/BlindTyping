import React from "react";
import Header from "./Header";
import Keyboard from "./Keyboard";
import Footer from "./Footer";
import axios from "axios";
import "./index.css";

const wordsURL = "https://random-word-api.herokuapp.com/word?number=12";
const engTextURL = "";
//укажите, что текст сгенерирован на fish-text.ru
const ruTextURL = "https://fish-text.ru/get?format=json&number=1";

class App extends React.Component {
  timeTmp = 0;
  lettersTmp = 0;
  errTmp = 0;
  constructor(props) {
    super(props);
    this.state = {
      lang: "English words",
      speed: null,
      err: null,
      printedText: "",
      textForPrint: "",
    }
    
    this.getWords = this.getWords.bind(this);
    this.printCheck = this.printCheck.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }


  render() {
    return (
    <div>
      <Header lang={this.state.lang} speed={this.state.speed} err={this.state.err} />
      <div className="dropdownContainer">
        <div className="dropdown">
          <div className="dropbtn">Выбрать язык</div>
          <div className="dropdown-content">
            <p onClick={() => this.changeLang("English words")}>English words</p>
            <p onClick={() => this.changeLang("Русские слова")}>Русские слова</p>
            <p onClick={() => this.changeLang("Русский текст")}>Русский текст</p>
          </div>
        </div>
      </div>
      <div className="inputBlock">
        <input className="typingLine" placeholder="print there" onChange={etc => this.printCheck(etc.target.value)}></input>
        <div className="text">
          <span className="printedText">{this.state.printedText}</span>
          <span className="textForPrint">{this.state.textForPrint}</span>
        </div>
      </div>
      <Keyboard prev={this.state.printedText} next={this.state.textForPrint} lang={this.state.lang}/>
      <Footer />
    </div>
    );
  }
  
  componentDidMount () {
    this.getWords();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.lang !== this.state.lang) {
      this.getWords();
    }
  }

  changeLang = (newLang) => {
    if (this.state.lang !== newLang) {
      document.getElementsByClassName("typingLine")[0].value = "";
      this.setState({textForPrint: ""});
      this.setState({printedText: ""});
      this.setState({lang: newLang});
    }
  }

  getWords() {
    switch(this.state.lang) {
      case "English words" : {
        axios.get(wordsURL).then((response) => {
          let str = "";
          let i = 0;
          while (str.length < 60 && i < response.data.length) {
            if (response.data[i].length < 11)
              str = str + response.data[i] + " ";
            i++;
          }
          this.setState({printedText: ""});
          this.setState({textForPrint: str});
        });
        break;
      }
      case "English text" : {
        axios.request(engTextURL).then((response) => {
          console.log(response.data);
        });
        break;
      }
      case "Русские слова" : {
        axios.request(ruTextURL).then((response) => {
          console.log(response.data);
          this.setState({printedText: ""});
          this.setState({textForPrint: "ещё ничего нет "});
        });
        break;
      }
      case "Русский текст" : {
        axios.request(ruTextURL).then((response) => {
          console.log(response.data);
          this.setState({printedText: ""});
          this.setState({textForPrint: "ещё ничего нет "});
        });
        break;
      }
      default: break;
    }
  }

  printCheck(value) {
    let pl = this.state.printedText.length;
    if (pl === 0) {
      this.timeTmp = performance.now();
      this.lettersTmp = this.state.textForPrint.length;
      this.errTmp = 0;
    }
    if (value.slice(0, pl) === this.state.printedText && value.slice(pl) === this.state.textForPrint.slice(0, value.length - pl)) {
      this.setState({printedText: this.state.printedText + this.state.textForPrint.slice(0, value.length - pl)});
      this.setState({textForPrint: this.state.textForPrint.slice(value.length - pl)});
      if (this.state.textForPrint.length === 1) {
        this.timeTmp = (performance.now() - this.timeTmp) / 60000;
        this.setState({err: Math.floor((this.errTmp/this.lettersTmp) * 10000)/100});
        this.setState({speed: Math.floor(this.lettersTmp / this.timeTmp)});
        document.getElementsByClassName("typingLine")[0].value = "";
        this.getWords();
      }
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    }
    else if (value.length === pl && value === this.state.printedText) {
      document.getElementsByClassName("typingLine")[0].style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    }
    else if (value.length < pl) {
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