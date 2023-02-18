import React from 'react';
import './index.css';
import * as ReactDOMClient from 'react-dom/client';

let lang = "Eng"
let speed = null;
let errors = null;

const element = (
  <div className="container">
    <div className="header-content">
      <span className="lang">{lang}</span>
      <span>
        <span class="typeStats">speed {speed !== null ? speed : "--"}</span>
        <span class="typeStats">errors {errors !== null ? errors : "--"}</span>
      </span>
    </div>
  </div>)

const header = ReactDOMClient.createRoot(document.getElementById('header'));
header.render(element);