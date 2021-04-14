import logo from './logo.svg';
import './App.css';
import Canteen from './Canteen.js';
import Customerlogin from './login/customerlogin.js'
import Canteenlogin from './login/canteenlogin.js'
import Register from './login/register.js'
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
      <Customerlogin customerlogin={this.customerlogin} logout={this.logout} canteenlogin={this.canteenlogin}/>
      <Canteenlogin customerlogin={this.customerlogin} logout={this.logout} canteenlogin={this.canteenlogin}/>
      <Register/>
      <Canteen id={this.state.id} logout={this.logout} logout={this.logout} customer_canteen={this.state.customer_canteen}/>
    </div>
  );

  }
}

export default App;
