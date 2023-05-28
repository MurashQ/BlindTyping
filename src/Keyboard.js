import React from 'react';
import KeyboardButton from './KeyboardButton';

//каждый элемент массива - кнопка типа [значене1, значение2, рука, часть клавиатуры]
//значение1 - нажатие с шифтом, значение2 - нажатие без шифта, рука - палец на руке (см /src/img), часть клавиатуры - левая или правая
const engKeyboardLine1 = [["~", "`", "h1", "l"], ["!", "1", "h1", "l"], ["@", "2", "h2", "l"], ["#", "3", "h3", "l"], ["$", "4", "h4", "l"], ["%", "5", "h4", "l"], ["^", "6", "h7", "r"], ["&", "7", "h7", "r"], ["*", "8", "h8", "r"], ["(", "9", "h9", "r"], [")", "0", "h10", "r"], ["_", "-", "h10", "r"], ["+", "=", "h10", "r"]];
const engKeyboardLine2 = [["Q", "q", "h1", "l"], ["W", "w", "h2", "l"], ["E", "e", "h3", "l"], ["R", "r", "h4", "l"], ["T", "t", "h4", "l"], ["Y", "y", "h7", "r"], ["U", "u", "h7", "r"], ["I", "i", "h8", "r"], ["O", "o", "h9", "r"], ["P", "p", "h10", "r"], ["{", "[", "h10", "r"], ["}", "]", "h10", "r"], ["|","\\", "h10", "r"]];
const engKeyboardLine3 = [["A", "a", "h1", "l"], ["S", "s", "h2", "l"], ["D", "d", "h3", "l"], ["F", "f", "h4", "l"], ["G", "g", "h4", "l"], ["H", "h", "h7", "r"], ["J", "j", "h7", "r"], ["K", "k", "h8", "r"], ["L", "l", "h9", "r"], [":", ";", "h10", "r"], ['"', "'", "h10", "r"]];
const engKeyboardLine4 = [["Z", "z", "h1", "l"], ["X", "x", "h2", "l"], ["C", "c", "h3", "l"], ["V", "v", "h4", "l"], ["B", "b", "h4", "l"], ["N", "n", "h7", "r"], ["M", "m", "h7", "r"], ["<", ",", "h8", "r"], [">", ".", "h9", "r"], ["?", "/", "h10", "r"]];
const rusKeyboardLine1 = [["Ё", "ё", "h1", "l"], ["!", "1", "h1", "l"], ["\"", "2", "h2", "l"], ["№", "3", "h3", "l"], [";", "4", "h4", "l"], ["%", "5", "h4", "l"], [":", "6", "h7", "r"], ["?", "7", "h7", "r"], ["*", "8", "h8", "r"], ["(", "9", "h9", "r"], [")", "0", "h10", "r"], ["_", "-", "h10", "r"], ["+", "=", "h10", "r"]];
const rusKeyboardLine2 = [["Й", "й", "h1", "l"], ["Ц", "ц", "h2", "l"], ["У", "у", "h3", "l"], ["К", "к", "h4", "l"], ["Е", "е", "h4", "l"], ["Н", "н", "h7", "r"], ["Г", "г", "h7", "r"], ["Ш", "ш", "h8", "r"], ["Щ", "щ", "h9", "r"], ["З", "з", "h10", "r"], ["Х", "х", "h10", "r"], ["Ъ", "ъ", "h10", "r"], ["/","\\", "h10", "r"]];
const rusKeyboardLine3 = [["Ф", "ф", "h1", "l"], ["Ы", "ы", "h2", "l"], ["В", "в", "h3", "l"], ["А", "а", "h4", "l"], ["П", "п", "h4", "l"], ["Р", "р", "h7", "r"], ["О", "о", "h7", "r"], ["Л", "л", "h8", "r"], ["Д", "д", "h9", "r"], ["Ж", "ж", "h10", "r"], ["Э", "э", "h10", "r"]];
const rusKeyboardLine4 = [["Я", "я", "h1", "l"], ["Ч", "ч", "h2", "l"], ["С", "с", "h3", "l"], ["М", "м", "h4", "l"], ["И", "и", "h4", "l"], ["Т", "т", "h7", "r"], ["Ь", "ь", "h7", "r"], ["Б", "б", "h8", "r"], ["Ю", "ю", "h9", "r"], [",", ".", "h10", "r"]];
//в массивах записаны все клавиши клавиатуры со стандартными раскладками: qwerty и йцукен
//последний элемент каждого внутреннего массива (например engKeyboardKine2[0][1] === q или rusKeyboardLine3[0][2]) идет в id клавиши в HTML

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

  componentDidMount() { //При монтировании компонента он сразу наполняется символами клавиатуры (массивов)
    switch (this.props.lang) {
      case "English words" :
      case "English text" :
        this.setState({l1: engKeyboardLine1, l2: engKeyboardLine2, l3: engKeyboardLine3, l4: engKeyboardLine4});
        break;
      case "Русские слова" :
      case "Русский текст" :
        this.setState({l1: rusKeyboardLine1, l2: rusKeyboardLine2, l3: rusKeyboardLine3, l4: rusKeyboardLine4});
        break;
      default : break;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) { //Если изменился язык, меняется раскладка
      this.componentDidMount();
    }
    if (prevProps.next[0] === " " || this.props.next[0] === " ")
      document.getElementById("space").classList.toggle("helpEffect");
    /*if (prevProps.next[0] !== this.props.next[0]) { //добавляет и убирает вспомогательный эффект по this.props.next
      helpEffect(prevProps.next[0], prevProps.lang);
      helpEffect(this.props.next[0], this.props.lang, prevProps.next[0]);
    }*/
  }

  render() {
    return (
      <div className="keyboard">
        <div className="keyboardLine">
          {this.state.l1.map((el, i) => (
            <KeyboardButton elem={el} key={i} next={this.props.next}/>
          ))}
          <div className="backspace">Backspace</div>
        </div>
        <div className="keyboardLine">
          <div className="tab">Tab</div>
          {this.state.l2.map((el, i) => (
            <KeyboardButton elem={el} key={i} next={this.props.next}/>
          ))}
        </div>
        <div className="keyboardLine">
          <div className="capsLock">Caps lock</div>
          {this.state.l3.map((el, i) => (
            <KeyboardButton elem={el} key={i} next={this.props.next}/>
          ))}
          <div className="enter">Enter</div>
        </div>
        <div className="keyboardLine">
          <div className="shift" id="lShift">Shift</div>
          {this.state.l4.map((el, i) => (
            <KeyboardButton elem={el} key={i} next={this.props.next}/>
          ))}
          <div className="shift" id="rShift">Shift</div>
        </div>
        <div className="keyboardLine">
          <div className="space" id="space"></div>
        </div>
      </div>
    );
  }
}

export default Keyboard;



//Теперь кнопки сами добавляют себе классы, если им нужны

/*ИСПРАВЛЕНО, СНИЗУ ПЛОХОЙ КОД*/

// Можно было проще, но сразу не догадался
// Может быть когда-нибудь переделаю, но не сейчас
// Нужно было писать этот метод в компоненте KeyboardButton.js, тогда не обязательно было бы использовать id в html
/*function helpEffect(letter, lang, prev) {
  if (letter === undefined) {}//общие правила
  else if (letter === " ") {
    hand("space", toEng(prev));
    document.getElementById("space").classList.toggle("helpEffect");
  }
  else if (letter === "!") {
    hand("b1"); // для символа '!' добавляет руку ("b1 - id в html документе")
    hand("rShift"); // и для shift
    document.getElementById("b1").classList.toggle("helpEffect"); //клавиши также подсвечиваются
    document.getElementById("rShift").classList.toggle("helpEffect");
  }
  else if (lang[0] === "E") { //Только для английской клавиатуры
    if (letter === "\"") {
      hand("b'");
      hand("lShift");
      document.getElementById("b'").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === ":") {
      hand("b;");
      hand("lShift");
      document.getElementById("b;").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === "?") {
      hand("b/");
      hand("lShift");
      document.getElementById("b/").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter.toUpperCase() === letter && letter.match(/[a-z]/i)) { //для всех прописных (заглавных) букв
      if(isLeft(toEng(letter.toLowerCase())) === true) { //они деляться на левые и правые
        hand("b" + letter.toLowerCase());
        hand("rShift");
        document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
        document.getElementById("rShift").classList.toggle("helpEffect");
      }
      else {
        hand("b" + letter.toLowerCase());
        hand("lShift");
        document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
        document.getElementById("lShift").classList.toggle("helpEffect");
      }
    }
    else {
      if (document.getElementById("b" + toEng(letter)) !== null) {
        hand("b" + letter);
        document.getElementById("b" + letter).classList.toggle("helpEffect");
      }
    }
  } 
  else if (lang[0] === "Р") { //Только для Русской клавиатуры
    if (letter === "\"") {
      hand("b2");
      hand("rShift");
      document.getElementById("b2").classList.toggle("helpEffect");
      document.getElementById("rShift").classList.toggle("helpEffect");
    }
    else if (letter === ":") {
      hand("b6");
      hand("lShift");
      document.getElementById("b6").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === ",") {
      hand("b/");
      hand("lShift");
      document.getElementById("b/").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === ";") {
      hand("b4");
      hand("rShift");
      document.getElementById("b4").classList.toggle("helpEffect");
      document.getElementById("rShift").classList.toggle("helpEffect");
    }
    else if (letter === "?") {
      hand("b7");
      hand("lShift");
      document.getElementById("b7").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === "(") {
      hand("b9");
      hand("lShift");
      document.getElementById("b9").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === ")") {
      hand("b0");
      hand("lShift");
      document.getElementById("b0").classList.toggle("helpEffect");
      document.getElementById("lShift").classList.toggle("helpEffect");
    }
    else if (letter === "-") {
      hand("b-");
      document.getElementById("b-").classList.toggle("helpEffect");
    }
    else if ((letter.toUpperCase() === letter && letter.match(/[а-я]/i)) || letter === "Ё") { //для всех прописных (заглавных) букв
      if(isLeft(toEng(letter.toLowerCase())) === true) { //они деляться на левые и правые
        hand("b" + toEng(letter.toLowerCase()));
        hand("rShift");
        document.getElementById("b" + toEng(letter.toLowerCase())).classList.toggle("helpEffect");
        document.getElementById("rShift").classList.toggle("helpEffect");
      }
      else {
        hand("b" + toEng(letter.toLowerCase()));
        hand("lShift");
        document.getElementById("b" + toEng(letter.toLowerCase())).classList.toggle("helpEffect");
        document.getElementById("lShift").classList.toggle("helpEffect");
      }
    }
    else {
      if (document.getElementById("b" + toEng(letter)) !== null) {
        hand("b" + toEng(letter));
        document.getElementById("b" + toEng(letter)).classList.toggle("helpEffect");
      }
    }
  }
}

function hand(l, prev) { //добавляет и убирает эффект руки (добавлением класса css)
  switch (l) {
    case "space": { //пробел выбирается относительно предыдущей клавиши
      if (document.getElementById("space").classList.contains("hand5"))
        document.getElementById("space").classList.toggle("hand5");
      else if (document.getElementById("space").classList.contains("hand6"))
        document.getElementById("space").classList.toggle("hand6");
      else if (isLeft(prev))
        document.getElementById("space").classList.toggle("hand6");
      else
        document.getElementById("space").classList.toggle("hand5");
      break;
    }
    case "b`": case "b1": case "bq": case "ba": case "bz": case "lShift": //каждой клавише своя рука
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
function isLeft(l) { //возвращает true если клавиша относиться к левой руке, иначе false
  switch (l) {
    case "q": case "w": case "e": case "r": case "t": case "a": case "s":
    case "d": case "f": case "g": case "z": case "x": case "c": case "v":
    case "b": case "ё": case "й": case "ц": case "у": case "к": case "е":
    case "ф": case "ы": case "в": case "а": case "п": case "я": case "ч":
    case "с": case "м": case "и": case "1": case "2": case "3": case "4":
    case "5": case "`": return true;
    default: return false;
  }
}
function toEng(l) { //для каждого пердусмотренного символа возвращает соответствующий символ с английской раскладкой
  // чтобы заменить русские символы на английские в ID (для getElementById)
  switch (l) {
    case "ё": return "`"; case "й": return "q"; case "ц": return "w"; case "у": return "e";
    case "к": return "r"; case "е": return "t"; case "н": return "y"; case "г": return "u";
    case "ш": return "i"; case "щ": return "o"; case "з": return "p"; case "х": return "[";
    case "ъ": return "]"; case "ф": return "a"; case "ы": return "s"; case "в": return "d";
    case "а": return "f"; case "п": return "g"; case "р": return "h"; case "о": return "j";
    case "л": return "k"; case "д": return "l"; case "ж": return ";"; case "э": return "'";
    case "я": return "z"; case "ч": return "x"; case "с": return "c"; case "м": return "v";
    case "и": return "b"; case "т": return "n"; case "ь": return "m"; case "б": return ",";
    case "ю": return "."; case ".": return "/";
    default: return l;
  }
}*/



