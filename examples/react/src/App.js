// Libraries
import React, { Component } from 'react';
import Akio from 'akio-browser';

// Assets
import logo from './logo.svg';
import './App.css';

class App extends Component {
  async componentDidMount() {
    this.akio = await Akio.init({
      token: 'your-token-here',
    });

    await this.akio.identify({
      userId: 'test@example.com',
      userAddress: '0xethereumaddresshere',
    });

    await this.akio.track({
      event: 'Viewed Home Page',
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
