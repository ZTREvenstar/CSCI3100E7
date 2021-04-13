import logo from './logo.svg';
import './App.css';
import Canteen from './Canteen.js';
import Login from './login.js'
import React from "react"
class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="App">
            <Login />
          </div>
        </header>
        <body>
          <Canteen />
        </body>

      </div>






    );
  }
}

export default App;
