import React from "react";
import Header from "./Header";
import ChangeLangMenu from "./ChangeLangMenu";
import InputBlock from "./InputBlock";
import Keyboard from "./Keyboard";
import Footer from "./Footer";
import axios from "axios";
import "./index.css";

const wordsURL = "https://random-word-api.herokuapp.com/word?number=10";
const ruTextURL = "https://fish-text.ru/get?format=json&number=8"; //укажите, что текст сгенерирован на fish-text.ru

class App extends React.Component {
  wordsTmp = []; //хранит текст полученный из запроса
  constructor(props) {
    super(props);
    this.state = {
      lang: "Русские слова",
      speed: "", //Скорость и ошибки выводяться в header
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
    this.getWords(); //Загружает слова сразу после загрузки страницы
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.lang !== this.state.lang) {
      this.getWords(); //Если изменен тип текста то нужен новый текст
    }
  }

  changeLang = (newLang) => { //Передается в компонент ChangeLangMenu
    if (this.state.lang !== newLang) {
      document.getElementsByClassName("typingLine")[0].value = ""; // очищает строку ввода
      this.setState({textForPrint: ""}); // убирает старый текст для ввода
      this.setState({printedText: ""});
      this.setState({lang: newLang});   // изменяет язык тем самым вызывая getWords()
      this.wordsTmp = "";
    }
  }

  getWords() {
    switch(this.state.lang) {
      case "English words" : { //Выбрано поле English words в меню ChangeLangMenu
        axios.get(wordsURL).then((response) => { // В response.data находится массив слов
          let str = "";
          let i = 0;
          while (str.length < 65 && i < response.data.length) { //добавляет к строке по одному слову пока строка не превысит размер в 60 символов
            if (response.data[i].length < 13)
              str = str + response.data[i] + " "; //Между каждым словом и в конце строки стоит пробел
            i++;
          }
          this.setState({printedText: ""});
          this.setState({textForPrint: str});//Выводит на экран полученный текст
        });
        break;
      }
      case "Русские слова" : { //Выбрано поле Русские слова в меню ChangeLangMenu
        axios.request(ruTextURL).then((response) => { //response.data содержит объект типа {status: "", text: ""}
          if (this.wordsTmp.length === 0) { //Если раньше еще не получали слов
            let str = "";                               //response.data.text содержит нужный текст в виде строки
            this.wordsTmp = response.data.text.replace(/[^a-zа-яё\s]/gi, "").toLowerCase(); //из текста удаляется все кроме букв и пробелов
            this.wordsTmp = this.wordsTmp.split(" "); //слова переводятся в массив
            this.wordsTmp = this.wordsTmp.sort(() => Math.random() - 0.5); //массив слов перемешивается
            for (let i = 0; i < this.wordsTmp.length; i++) { //слова из массива переписываются в массив
              if (this.wordsTmp[0].length > 3 && this.wordsTmp[0].length < 15) //пропускаем слово если оно короче 3 символов
                str = str + this.wordsTmp[0] + " ";
              if (str.length > 50) {//если строка длиньше 50 символов выходим из цикла
                this.wordsTmp.splice(0, 1);
                break;
              }
              this.wordsTmp.splice(0, 1);
            }
            this.setState({printedText: ""});
            this.setState({textForPrint: str}); //Выводим на экран полученный текст
          }
          else { //Если оставались какие-то слова в wordsTmp используем их
            let str = "";
            for (let i = 0; i < this.wordsTmp.length; i++) { //слова из массива переписываются в массив
              if (this.wordsTmp[0].length > 3) //пропускаем слово если оно короче 3 символов
                str = str + this.wordsTmp[0] + " ";
              if (str.length > 50) //если строка длиньше 60 символов выходим из цикла
                break;
                this.wordsTmp.splice(0, 1);
            }
            this.setState({printedText: ""});
            this.setState({textForPrint: str}); //Выводим на экран полученный текст
          }
        });
        break;
      }
      case "Русский текст" : { //Выбрано поле Русский текст в меню ChangeLangMenu
        if (this.wordsTmp.length === 0) {
          axios.request(ruTextURL).then((response) => { //Получаем то же что и в "Русские слова"
            this.wordsTmp = response.data.text.split(" "); // делаем все то же что и в "Русские слова", но не удаляем знаки припенаний
            let str = "";
            while (this.wordsTmp.length > 0 && str.length < 45) {
              str = str + this.wordsTmp[0] + " ";
              this.wordsTmp.splice(0, 1);
            }
            this.setState({printedText: ""});
            this.setState({textForPrint: str});
          });
        }
        else {
          let str = "";
          while (this.wordsTmp.length > 0 && str.length < 45) {
            str = str + this.wordsTmp[0] + " ";
            this.wordsTmp.splice(0, 1);
          }
          this.setState({printedText: ""});
          this.setState({textForPrint: str});
        }
        break;
      }
      default: break;
    }
  }


  /*Следующие 3 метода передаются в InputBlock  для отслеживания процесса записи текста в input поле*/
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