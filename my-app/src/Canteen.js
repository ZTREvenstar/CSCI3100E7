import React from "react"
import $ from "jquery"
import Navbar from "./canteen_component/Navbar"
import Carousel from "./canteen_component/Carousel"
import Nested from "./canteen_component/Nested"
import Profile from "./canteen_component/Profile"
import Table from "./canteen_component/Table"
import Form from "./canteen_component/Form"
import OrderCanteen from './order/orderCanteen.js'
const URL = "http://localhost:5000"




class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            Menu_data:[],

        }
      }


    get_Menu(){
        //console.log("asd");
        $.ajax({
            url: URL+'/api/canteen/dish?id='+this.props.canteenID,
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
        }, 2000);
        
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render(){

        if (this.props.PageToShow==0){
            return(
                <div>
            <Nested Menu_data={this.state.Menu_data}/>
            <Table search_content={this.props.search_content} Menu_data={this.state.Menu_data}/>
           
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
            search_content:null,
            PageToShow:0 ,// 0 means show Menu, 1 means show Order, 2 means show profile
            Random: 0
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

    start_search=(e,value)=>{
        e.preventDefault();
        console.log(value);
        this.setState({search_content:value})
    }
    cancel_search=(e)=>{
        e.preventDefault();
        this.setState({search_content:null})
    }
    set_random=()=>{
        this.setState({ Random:Math.random()})
    }

    render(){
        if (this.props.customer_canteen==1)
        return (
            
  <div className="container-fluid  bg-light" >
  <div className="row">
    <div className="col-md-12">
      <h3 className="text-info text-center" >
        Welcome Dear Canteen {this.props.id}
      </h3>
    <Navbar start_search={this.start_search}cancel_search={this.cancel_search} name={this.state.name} id={this.props.id} clickOnMenu={this.clickOnMenu} clickOnOrder={this.clickOnOrder} clickOnProfile={this.clickOnProfile} logout={this.props.logout}/>
    <Carousel Random={this.state.Random} canteenID={this.props.id}/>
    <Profile set_random={this.set_random} PageToShow={this.state.PageToShow} canteenID={this.props.id}/>
    <Menu search_content={this.state.search_content} PageToShow={this.state.PageToShow} canteenID={this.props.id}/>
    <OrderCanteen id={this.props.id} PageToShow={this.state.PageToShow} logout={this.props.logout} customer_canteen={this.props.customer_canteen}/>
    </div>
  </div>
</div>
        )
        else
        return null
    }

}


