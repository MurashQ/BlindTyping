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
          {engKeyboardLine1.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
          <div className="backspace">Backspace</div>
        </div>
        <div className="keyboardLine">
          <div className="tab">Tab</div>
          {engKeyboardLine2.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
        </div>
        <div className="keyboardLine">
          <div className="capsLock">Caps lock</div>
          {engKeyboardLine3.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
          <div className="enter">Enter</div>
        </div>
        <div className="keyboardLine">
          <div className="shift">Shift</div>
          {engKeyboardLine4.map((el, i) => (
            <KeyboardButton elem={el} key={i}/>
          ))}
          <div className="shift">Shift</div>
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
    } else {
      document.getElementById("b" + letter.toLowerCase()).classList.toggle("helpEffect");
    }
  }

  
}
export default Keyboard;