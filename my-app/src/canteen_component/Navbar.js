// This is navigation bar which control the transformation between different subpage
import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000"


export default class Navbar extends React.Component{

constructor(props){
    super(props)
    this.state={
        search_content:null
    }
}

get_search_content=(event)=>{
    //alert(event.target.value)
    this.setState({search_content: event.target.value})
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
           <form className="form-inline">
             <input name="content" className="form-control mr-sm-2"  onChange={this.get_search_content} /> 
             <button className="btn btn-primary mx-2 my-2 my-sm-0"  onClick={(e)=>this.props.start_search(e,this.state.search_content)}>
               Search
             </button>
             <button className="btn btn-primary mx-2 my-2 my-sm-0"  onClick={(e)=>this.props.cancel_search(e)}>
               Cancel
             </button>
           </form>
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
