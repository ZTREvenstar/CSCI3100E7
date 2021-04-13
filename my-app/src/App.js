import logo from './logo.svg';
import './App.css';
import Canteen from './Canteen.js';
import Login from './login.js'
import React from "react"
class App extends React.Component {

constructor(props){
  super(props)
  this.state=({

    id:null,
    customer_canteen: null
  })
}

logout=()=>{
  this.setState({
    id:null,
    customer_canteen:null
  })
}

customerlogin=(id_data)=>{
this.setState({
  id:id_data,
  customer_canteen:0
})
}
canteenlogin=(id_data)=>{
  this.setState({
    id:id_data,
    customer_canteen:1
  })

}

  render(){
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
      <Login customerlogin={this.customerlogin} logout={this.logout} canteenlogin={this.canteenlogin}/>
      <Canteen id={this.state.id} logout={this.logout} customer_canteen={this.state.customer_canteen}/>
    </div>
  );

  }
}

export default App;
