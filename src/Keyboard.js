import React from 'react';

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

function Keyboard(props) {
  return (
    <div className="keyboard">
      <div className="keyboardLine">
        {engKeyboardLine1.map((el) => (
          <div className="but" id={"b" + el[1]}>
            <div className="bSymb1">{el[0]}</div>
            <div className="bSymb2">{el[1]}</div>
          </div>
        ))}
        <div className="backspace">Backspace</div>
      </div>
      <div className="keyboardLine">
        <div className="tab">Tab</div>
        {engKeyboardLine2.map((el) => (
          <div className="but" id={"b" + el[1]}>
            <div className="bSymb1">{el[0]}</div>
            <div className="bSymb2">{el[1]}</div>
          </div>
        ))}
      </div>
      <div className="keyboardLine">
        <div className="capsLock">Caps lock</div>
        {engKeyboardLine3.map((el) => (
          <div className="but" id={"b" + el[1]}>
            <div className="bSymb1">{el[0]}</div>
            <div className="bSymb2">{el[1]}</div>
          </div>
        ))}
        <div className="enter">Enter</div>
      </div>
      <div className="keyboardLine">
        <div className="shift">Shift</div>
        {engKeyboardLine4.map((el) => (
          <div className="but" id={"b" + el[1]}>
            <div className="bSymb1">{el[0]}</div>
            <div className="bSymb2">{el[1]}</div>
          </div>
        ))}
        <div className="shift">Shift</div>
      </div>
      <div className="keyboardLine">
        <div className="space"></div>
      </div>
    </div>
  );
}
export default Keyboard;