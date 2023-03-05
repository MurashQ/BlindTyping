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
  ["Z", "z"], ["X", "x"], ["C", "c"], ["V", "v"], ["B", "b"], ["N", "n"], ["M", "m"], ["<", ","], [">", "."], ["/", "?"]
];

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      l1: engKeyboardLine1,
      l2: engKeyboardLine2,
      l3: engKeyboardLine3,
      l4: engKeyboardLine4
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.next !== this.props.next && this.props.next !== "") {
      if (prevProps.next !== "") {
        this.helpEffect(prevProps.next[0]);
      }
      this.helpEffect(this.props.next[0]);
    }
    if (this.props.next === "") {
      this.helpEffect(" ");
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

  helpEffect(letter) {
    if (letter === " ") {
      document.getElementById("space").classList.toggle("helpEffect");
    }
    else if (letter === "!") {
      document.getElementById("b1").classList.toggle("helpEffect");
      document.getElementById("rShift").classList.toggle("helpEffect");
    }
    else if (letter.toUpperCase() === letter) {
      if(isLeft(letter.toLowerCase()) === true) {
        document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
        document.getElementById("rShift").classList.toggle("helpEffect");
      }
      else {
        document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
        document.getElementById("lShift").classList.toggle("helpEffect");
      }
    }
    else {
      document.getElementById("b" + letter).classList.toggle("helpEffect");
    }
  }

  
}

function isLeft(l) {
  switch (l) {
    case "q":
    case "w":
    case "e":
    case "r":
    case "t":
    case "a":
    case "s":
    case "d":
    case "f":
    case "g":
    case "z":
    case "x":
    case "c":
    case "v":
    case "b": return true;
    default: return false;
  }
}
export default Keyboard;