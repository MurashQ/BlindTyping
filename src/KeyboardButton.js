import React from 'react';

function KeyboardButton(props) {
  return (
    <div className="but" id={"b" + props.elem[props.elem.length - 1]}>
      <div className="bSymb1">{props.elem[0]}</div>
      <div className="bSymb2">{props.elem[1]}</div>
    </div>
  );
}

export default KeyboardButton;