import Profile from './Profile.js';
import $ from "jquery"
import React from "react"
import OrderCustomer from './order/orderCustomer.js';
import UserInt from './user_canteen.js';

class Navbar extends React.Component{

    constructor(props){
        super(props)
        this.state={
            search_content:null
        }
    }
        render(){
    
            return (
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
             
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
               <span className="navbar-toggler-icon"></span>
             </button> <a className="navbar-brand btn" onClick={this.props.clickOnProfile}>Profile</a>
             <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               <ul className="navbar-nav">
                 <li className="nav-item ">
                    <a className="nav-link btn active"  onClick={this.props.clickOnMenu}>Menu</a>
                 </li>
                 <li className="nav-item ">
                    <a className="nav-link btn active"  onClick={this.props.clickOnOrder}>Order</a>
                 </li>
               </ul>

               <ul className="navbar-nav ml-md-auto">
     
                 <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle btn" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" onClick={this.props.logout}>Log out</a>
                   <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href="#">Action</a> <a className="dropdown-item" href="#">Another action</a> <a className="dropdown-item" href="#">Something else here</a>
                     <div className="dropdown-divider">
                     </div> <a className="dropdown-item" href="#">Separated link</a>
                   </div>
                 </li>
               </ul>
             </div>
           </nav>
            )
        }
    
    }



export default class Customer extends React.Component{

    constructor(props){
        
        super(props);

        this.state={
          
            name:null,
            id:0,
            password:null,
            PageToShow:0 ,// 0 means show Profile, 1 means show Order, 2 means show profile
            Random: 0
        }
        
        }

    clickOnMenu=()=>{
        this.setState({PageToShow:2})
    }
    clickOnOrder=()=>{
        this.setState({PageToShow:1})
    }
    clickOnProfile=()=>{
        this.setState({PageToShow:0})
    }


    render(){

        if (this.props.customer_canteen==0){

        let display = null

        if(this.state.PageToShow==0){
          display = <Profile PageToShow={this.state.PageToShow} id={this.props.id} logout={this.props.logout} customer_canteen={this.props.customer_canteen}/>
        }else if(this.state.PageToShow==1){
          display = <OrderCustomer PageToShow={this.state.PageToShow} id={this.props.id} logout={this.props.logout} customer_canteen={this.props.customer_canteen}/>
        }else{
          display = <UserInt PageToShow={this.state.PageToShow} uid={this.props.id} logout={this.props.logout} customer_canteen={this.props.customer_canteen}/>
        }
        return (
            
  <div className="container-fluid  bg-light" >
  <div className="row">
    <div className="col-md-12">
      <h3 className="text-info text-center" >
        Welcome Dear Customer {this.props.id}
      </h3>
    <Navbar name={this.state.name} id={this.props.id} clickOnMenu={this.clickOnMenu} clickOnOrder={this.clickOnOrder} clickOnProfile={this.clickOnProfile} logout={this.props.logout}/>
    {display}
    </div>
  </div>
</div>
        )}
        else{
          return null
        }
        
    }

}

