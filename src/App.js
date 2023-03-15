import React from "react";
import Header from "./Header";
import ChangeLangMenu from "./ChangeLangMenu";
import InputBlock from "./InputBlock";
import Keyboard from "./Keyboard";
import Footer from "./Footer";
import axios from "axios";
import "./index.css";

const wordsURL = "https://random-word-api.herokuapp.com/word?number=12";
const ruTextURL = "https://fish-text.ru/get?format=json&number=1"; //укажите, что текст сгенерирован на fish-text.ru

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: "English words",
      speed: "",
      err: "",
      printedText: "",
      textForPrint: "",
    }
    this.getWords = this.getWords.bind(this);
    this.setText = this.setText.bind(this);
    this.endPrinting = this.endPrinting.bind(this);
    this.backspaceInput = this.backspaceInput.bind(this);
  }

  render() {
    return (
    <div>
      <Header lang={this.state.lang} speed={this.state.speed} err={this.state.err} />
      <ChangeLangMenu changLang={this.changeLang} />
      <InputBlock printed={this.state.printedText} forPrint={this.state.textForPrint} printCheck={this.printCheck} endPrinting={this.endPrinting} setText={this.setText} backspaceInput={this.backspaceInput} />
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
      case "Русские слова" : {
        axios.request(ruTextURL).then((response) => {
          console.log(response.data);
          this.setState({printedText: ""});
          this.setState({textForPrint: ".Аещё ничего нет "});
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

  setText(value, pl) {
    this.setState({printedText: this.state.printedText + this.state.textForPrint.slice(0, value.length - pl)});
    this.setState({textForPrint: this.state.textForPrint.slice(value.length - pl)});
  }
  endPrinting(errTmp, speedTmp) {
    this.setState({err: errTmp});
    this.setState({speed: speedTmp});
    document.getElementsByClassName("typingLine")[0].value = "";
    this.getWords();
  }
  backspaceInput(value) {
    this.setState({printedText: this.state.printedText.slice(0, value.length)});
    this.setState({textForPrint: this.state.printedText.slice(value.length) + this.state.textForPrint});
  }
}
export default App;