// This component will import all canteen components from "./canteen_component/"
import React from "react"
import $ from "jquery"
import Navbar from "./canteen_component/Navbar"
import Carousel from "./canteen_component/Carousel"
import Nested from "./canteen_component/Nested"
import Profile from "./canteen_component/Profile"
import Table from "./canteen_component/Table"
import Form from "./canteen_component/Form"
import OrderCanteen from './order/orderCanteen.js'

const URL = "http://54.227.0.209:5000"



// It is the initial page that will display menu information 
class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            Menu_data:[],

        }
      }


    get_Menu(){
        //console.log("asd");
        this.serverRequest = $.ajax({
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
                this.get_Menu();

        
    }
    componentWillUnmount(){
        this.serverRequest.abort();
    }

    render(){

        if (this.props.PageToShow==0){
            return(
                <div>
            <Nested Menu_data={this.state.Menu_data}/>
            <Table search_content={this.props.search_content} Menu_data={this.state.Menu_data} handleDelete = {()=>this.get_Menu()}/>
           
            <Form canteenID={this.props.canteenID} Menu_data={this.state.Menu_data} handleSubmit = {()=>this.get_Menu()} />
                </div>
        )
        }
        else
            return null
    }
    
}



// This is the main component which contains all subcomponents 
export default class Canteen extends React.Component{

    constructor(props){
        
        super(props);

        this.state={
          
            name:null,
            id:0,
            password:null,
            search_content:null, // to use search function 
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
        if (this.props.customer_canteen==1){
            let display = null
            if(this.state.PageToShow == 2){
                display = <Profile set_random={this.set_random} PageToShow={this.state.PageToShow} canteenID={this.props.id}/>
            }else if(this.state.PageToShow == 1){
                display = <OrderCanteen id={this.props.id} PageToShow={this.state.PageToShow} logout={this.props.logout} customer_canteen={this.props.customer_canteen}/>
            }else{
                display = <Menu search_content={this.state.search_content} PageToShow={this.state.PageToShow} canteenID={this.props.id}/>
            }
            return (
    <div className="container-fluid  bg-light" >
    <div className="row">
        <div className="col-md-12">
        <h3 className="text-info text-center" >
            Welcome Dear Canteen {this.props.id}
        </h3>
        <Navbar start_search={this.start_search}cancel_search={this.cancel_search} name={this.state.name} id={this.props.id} clickOnMenu={this.clickOnMenu} clickOnOrder={this.clickOnOrder} clickOnProfile={this.clickOnProfile} logout={this.props.logout}/>
        <Carousel Random={this.state.Random} canteenID={this.props.id}/>
        {display}
        </div>
    </div>
    </div>
        )}
        else{return null}
    }

}


