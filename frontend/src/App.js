import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: null
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.unlock(location);
      }, function () {
        console.log("Something went wrong to get your current location");
      });
    } else {
      console.log("Your browser doesn't support geolocation");
    }
  }

  unlock(location) {
    axios.post('http://localhost:8090/api/location/ping', { location })
      .then((response) => {
        this.setState({
          result: response.data
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
          <h1 className="App-title">Geogame</h1>
        </header>
        {
          this.state.result ? (
            <div>
              <h2>Parabéns!</h2>
              <p>Você acabou de desbloquear o {this.state.result[0].name}</p>

              {
                this.state.result[0].info.map((currentInfo, i) => {
                  return (
                    <div key={i}>
                      <strong>{currentInfo.title}</strong>: 
                      <span>{currentInfo.value}</span>
                    </div>
                  )
                })
              }

            </div>
          ) : null
        }
        <button onClick={() => {
          // this.ping();
        }}>Ping</button>
      </div>
    );
  }
}

export default App;
