import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      mensagem: 'Olá, Fabricio e Victor'
    };
  }
  
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.ping(location);
      }, function () {
        console.log("Something went wrong to get your current location");
      });
    } else {
      console.log("Your browser doesn't support geolocation");
    }
  }

  ping(location) {
    console.log(location)
    axios.post('http://localhost:8090/api/location/ping', {location})
      .then((response) => {
        this.setState({
          mensagem: response.data
        });
      })
      .catch((err) => {
        console.log('ERRO', err)
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.mensagem}</h1>
        </header>
        <button onClick={() => {
          // this.ping();
        }}>Ping</button>
      </div>
    );
  }
}

export default App;
