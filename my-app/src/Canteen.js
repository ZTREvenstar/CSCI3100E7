import React from "react"
import $ from "jquery"
import Navbar from "./canteen_component/Navbar"
import Carousel from "./canteen_component/Carousel"
import Nested from "./canteen_component/Nested"
import Profile from "./canteen_component/Profile"
import Table from "./canteen_component/Table"
import Form from "./canteen_component/Form"
const URL = "http://localhost:5000"




class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            Menu_data:[],

        }
      }


    get_Menu(){
        $.ajax({
            url: URL+'/api/canteen/dish',
            type:'GET',
            dataType:'json',
            //async:false,
            success: (data,status)=>{
                console.log("succeed");
                console.log(data);
                this.setState({Menu_data:data})

                //add_menu_list($("#menu"), data);
            },
            error:(data,status)=>{
                console.log("error");
                console.log(data);
            }
    
        });
    }
    componentDidMount(){
        //console.log("Menu canteenID is"+this.props.canteenID)

        this.intervalId = setInterval(() => {
                this.get_Menu();
        }, 3000);
        
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render(){

        if (this.props.PageToShow==0){
            return(
                <div>
            <button  className="btn btn-primary text-center">transform</button>
            <Nested Menu_data={this.state.Menu_data}/>
            <Table Menu_data={this.state.Menu_data}/>
           
            <Form canteenID={this.props.canteenID} Menu_data={this.state.Menu_data}/>
                </div>
        )
        }
        else
            return null
    }
    
}


export default class Canteen extends React.Component{

    constructor(props){
        
        super(props);

        this.state={
          
            name:null,
            id:0,
            password:null,
            PageToShow:0 // 0 means show Menu, 1 means show Order, 2 means show profile
        }
        
        }

    clickOnMenu=()=>{
        this.setState({PageToShow:0})
    }
    clickOnOrder=()=>{
        this.setState({PageToShow:1})
    }
    clickOnProfile=()=>{
        this.setState({PageToShow:2})
    }

    render(){
        return (
            
  <div className="container-fluid  bg-light" >
  <div className="row">
    <div className="col-md-12">
      <h3 className="text-info text-center" >
        Welcome
      </h3>
    <Navbar name={this.state.name} id={this.state.id} clickOnMenu={this.clickOnMenu} clickOnOrder={this.clickOnOrder}clickOnProfile={this.clickOnProfile}/>
    <Carousel />
    <Profile PageToShow={this.state.PageToShow} canteenID={this.state.id}/>
    <Menu PageToShow={this.state.PageToShow} canteenID={this.state.id}/>
    </div>
  </div>
</div>
        )
    }

}


