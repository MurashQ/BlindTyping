import React from 'react';
import KeyboardButton from './KeyboardButton';

const engKeyboardLine1 = [
  ["~", "`"], ["!", "1"], ["@", "2"], ["#", "3"], ["$", "4"], ["%", "5"], ["^", "6"], ["&", "7"], ["*", "8"], ["(", "9"], [")", "0"], ["_", "-"], ["+", "="],
];
const engKeyboardLine2 = [
  ["Q", "q"], ["W", "w"], ["E", "e"], ["R", "r"], ["T", "t"], ["Y", "y"], ["U", "u"], ["I", "i"], ["O", "o"], ["P", "p"], ["{", "["], ["}", "]"], ["|","\\"]
];
const engKeyboardLine3 = [
  ["A", "a"], ["S", "s"], ["D", "d"], ["F", "f"], ["G", "g"], ["H", "h"], ["J", "j"], ["K", "k"], ["L", "l"], [":", ";"], ['"', "'"]
];
const engKeyboardLine4 = [
  ["Z", "z"], ["X", "x"], ["C", "c"], ["V", "v"], ["B", "b"], ["N", "n"], ["M", "m"], ["<", ","], [">", "."], ["?", "/"]
];
const rusKeyboardLine1 = [
  ["Ё", "ё", "`"], ["!", "1"], ["\"", "2"], ["№", "3"], [";", "4"], ["%", "5"], [":", "6"], ["?", "7"], ["*", "8"], ["(", "9"], [")", "0"], ["_", "-"], ["+", "="],
];
const rusKeyboardLine2 = [
  ["Й", "й", "q"], ["Ц", "ц", "w"], ["У", "у", "e"], ["К", "к", "r"], ["Е", "е", "t"], ["Н", "н", "y"], ["Г", "г", "u"], ["Ш", "ш", "i"], ["Щ", "щ", "o"], ["З", "з", "p"], ["Х", "х", "["], ["Ъ", "ъ", "]"], ["/","\\"]
];
const rusKeyboardLine3 = [
  ["Ф", "ф", "a"], ["Ы", "ы", "s"], ["В", "в", "d"], ["А", "а", "f"], ["П", "п", "g"], ["Р", "р", "h"], ["О", "о", "j"], ["Л", "л", "k"], ["Д", "д", "l"], ["Ж", "ж", ";"], ["Э", "э", "'"]
];
const rusKeyboardLine4 = [
  ["Я", "я", "z"], ["Ч", "ч", "x"], ["С", "с", "c"], ["М", "м", "v"], ["И", "и", "b"], ["Т", "т", "n"], ["Ь", "ь", "m"], ["Б", "б", ","], ["Ю", "ю", "."], [",", ".", "/"]
];


class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      l1: [],
      l2: [],
      l3: [],
      l4: []
    }
  }

  componentDidMount() {
    switch (this.props.lang) {
      case "English words" :
      case "English text" :
        this.setState({
          l1: engKeyboardLine1,
          l2: engKeyboardLine2,
          l3: engKeyboardLine3,
          l4: engKeyboardLine4 
        });
        break;
      case "Русские слова" :
      case "Русский текст" :
        this.setState({
          l1: rusKeyboardLine1,
          l2: rusKeyboardLine2,
          l3: rusKeyboardLine3,
          l4: rusKeyboardLine4
        });
        break;
      default : break;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.componentDidMount();
    }
    if (prevProps.next[0] !== this.props.next[0]) {
      this.helpEffect(prevProps.next[0], prevProps.lang);
      this.helpEffect(this.props.next[0], this.props.lang);
    }
  }

  render() {
    return (
      <div className="keyboard">
        <div className="keyboardLine">
          {this.state.l1.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
          <div className="backspace">Backspace</div>
        </div>
        <div className="keyboardLine">
          <div className="tab">Tab</div>
          {this.state.l2.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
        </div>
        <div className="keyboardLine">
          <div className="capsLock">Caps lock</div>
          {this.state.l3.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
          <div className="enter">Enter</div>
        </div>
        <div className="keyboardLine">
          <div className="shift" id="lShift">Shift</div>
          {this.state.l4.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
          <div className="shift" id="rShift">Shift</div>
        </div>
        <div className="keyboardLine">
          <div className="space" id="space"></div>
        </div>
      </div>
    );
  }

  helpEffect(letter, lang) {
    if (letter === undefined) {//общие правила

    }
    else if (letter === " ") {
      document.getElementById("space").classList.toggle("helpEffect");
    }
    else if (letter === "!") {
      this.hand("b1");
      this.hand("rShift");
      document.getElementById("b1").classList.toggle("helpEffect");
      document.getElementById("rShift").classList.toggle("helpEffect");
    }/******************************************************************/

    else if (lang[0] === "E") { //Только для английской клавиатуры
      if (letter === "\"") {
        this.hand("b'");
        this.hand("lShift");
        document.getElementById("b'").classList.toggle("helpEffect");
        document.getElementById("lShift").classList.toggle("helpEffect");
      }
      else if (letter === ":") {
        this.hand("b;");
        this.hand("lShift");
        document.getElementById("b;").classList.toggle("helpEffect");
        document.getElementById("lShift").classList.toggle("helpEffect");
      }
      else if (letter === "?") {
        this.hand("b/");
        this.hand("lShift");
        document.getElementById("b/").classList.toggle("helpEffect");
        document.getElementById("lShift").classList.toggle("helpEffect");
      }
      else if (letter.match(/[a-z]/i) && letter.toUpperCase() === letter) {
        if(isLeft(letter.toLowerCase()) === true) {
          this.hand("b" + letter.toLowerCase());
          this.hand("rShift");
          document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
          document.getElementById("rShift").classList.toggle("helpEffect");
        }
        else {
          this.hand("b" + letter.toLowerCase());
          this.hand("lShift");
          document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
          document.getElementById("lShift").classList.toggle("helpEffect");
        }
      }
      else {
        this.hand("b" + letter);
        document.getElementById("b" + letter).classList.toggle("helpEffect");
      }
    } /******************************************************************/

    else if (lang[0] === "Р") { //Только для Русской клавиатуры

      if ((letter.match(/[а-я]/i) && letter.toUpperCase() === letter) || letter === "Ё") {
        if(isLeft(letter.toLowerCase()) === true) {
          this.hand("b" + toEng(letter));
          document.getElementById("b" + toEng(letter.toLowerCase())).classList.toggle("helpEffect");
          document.getElementById("rShift").classList.toggle("helpEffect");
        }
        else {
          this.hand("b" + toEng(letter));
          document.getElementById("b" + toEng(letter.toLowerCase())).classList.toggle("helpEffect");
          document.getElementById("lShift").classList.toggle("helpEffect");
        }
      }
      else {
        this.hand("b" + toEng(letter));
        document.getElementById("b" + toEng(letter)).classList.toggle("helpEffect");
      }
    } /******************************************************************/
  }

  hand(l) {
    switch (l) {
      case "b`": case "b1": case "bq": case "ba": case "bz": case "lShift":
        document.getElementById(l).classList.toggle("hand1");
        break;
      case "b2": case "bw": case "bs": case "bx":
        document.getElementById(l).classList.toggle("hand2");
        break;
      case "b3": case "be": case "bd": case "bc":
        document.getElementById(l).classList.toggle("hand3");
        break;
      case "b4": case "b5": case "br": case "bt": case "bf": case "bg": case "bv": case "bb":
        document.getElementById(l).classList.toggle("hand4");
        break;
      case "b6": case "b7": case "by": case "bu": case "bh": case "bj": case "bn": case "bm":
        document.getElementById(l).classList.toggle("hand7");
        break;
      case "b8": case "bi": case "bk": case "b,":
        document.getElementById(l).classList.toggle("hand8");
        break;
      case "b9": case "bo": case "bl": case "b.":
        document.getElementById(l).classList.toggle("hand9");
        break;
      case "b0": case "b-": case "b=": case "bp": case "b[": case "b]": case "b;": case "b'": case "b/": case "b\\": case "rShift":
        document.getElementById(l).classList.toggle("hand10");
        break;
      default: break;
    }
  }

}

function isLeft(l) {
  switch (l) {
    case "q": case "w": case "e": case "r": case "t":
    case "a": case "s": case "d": case "f": case "g":
    case "z": case "x": case "c": case "v": case "b": 
    case "ё": case "й": case "ц": case "у": case "к":
    case "е": case "ф": case "ы": case "в": case "а":
    case "п": case "я": case "ч": case "с": case "м":
    case "и": return true;
    default: return false;
  }
}

function toEng(l) { // чтобы заменить русские символы на английские в ID
  switch (l) {
    case "ё": return "`"; case "й": return "q"; case "ц": return "w"; case "у": return "e";
    case "к": return "r"; case "е": return "t"; case "н": return "y"; case "г": return "u";
    case "ш": return "i"; case "щ": return "o"; case "з": return "p"; case "х": return "[";
    case "ъ": return "]"; case "ф": return "a"; case "ы": return "s"; case "в": return "d";
    case "а": return "f"; case "п": return "g"; case "р": return "h"; case "о": return "j";
    case "л": return "k"; case "д": return "l"; case "ж": return ";"; case "э": return "\"";
    case "я": return "z"; case "ч": return "x"; case "с": return "c"; case "м": return "v";
    case "и": return "b"; case "т": return "n"; case "ь": return "m"; case "б": return ",";
    case "ю": return "."; case ".": return "/";
    default: return l;
  }
}
export default Keyboard;