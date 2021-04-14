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

    id:1,
    customer_canteen: 1,
    login_register:0
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

BackToLogin=()=>{
  this.setState({
    login_register:0
  })
}

BackToRegister=()=>{
  this.setState({
    login_register:1
  })
}

render(){
  if (this.state.id==null)
  return (
    <div className="App">
    <Customerlogin login_register={this.state.login_register}customerlogin={this.customerlogin} logout={this.logout} canteenlogin={this.canteenlogin} BackToRegister={this.BackToRegister}/>
    <Canteenlogin login_register={this.state.login_register}customerlogin={this.customerlogin} logout={this.logout} canteenlogin={this.canteenlogin}BackToRegister={this.BackToRegister} />
    <Register login_register={this.state.login_register} BackToLogin={this.BackToLogin}/>
    </div>
  )
  else
  return (
    <div className="App">
      <Canteen id={this.state.id} logout={this.logout} customer_canteen={this.state.customer_canteen}/>
    </div>
  );

  }
}

export default App;
