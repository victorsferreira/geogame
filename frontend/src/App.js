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

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          resolve(location);
        }, (err) => {
          err.code = 'GEOLOCATION_ERROR';

          reject(err);
        });
      } else {
        const err = new Error("Your browser doesn't support geolocation");
        err.code = 'NO_BROWSER_SUPPORT';

        reject(err);
      }
    });
  }

  tryToUnlock = () => {
    this.getCurrentPosition()
      .then((location) => {
        return this.unlock(location);
      })
      .then((response) => {
        // ...
      })
      .catch((err) => {

      });
  }

  unlock(location) {
    return axios.post('http://localhost:8090/api/location', { location })
      .then((response) => {
        this.setState({
          result: response.data
        });

        return response;
      })
      .catch((err) => {
        console.log('ERRO', err)
        err.code = 'SERVER_ERROR';

        throw err;
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
        <button onClick={this.tryToUnlock}>UNLOCK!</button>
      </div>
    );
  }
}

export default App;
