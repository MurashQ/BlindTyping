import React from 'react';
import './index.css';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: "Eng",
      speed: null,
      err: null
    }
  }

  render() {
    return (
    <div>
      <Header lang={this.state.lang} speed={this.state.speed} err={this.state.err} />
        <div className="typingBlock">
          <div className="inputBlock">
            <input className="typingLine"></input>
          </div>
        </div>
      </div>
    );
  }
}

export default App;