import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000"


export default class Form extends React.Component{

    constructor(props){
        super(props)
        this.state={
            id:null, name:null,status:0,price:null ,img:null,
            Start_add:0
        }
    }
    
        Reset=()=>{
                this.setState({
                    id:null, name:null,status:0,price:null ,img:null
                })
    
            }
         post_menu=(e)=>{
            e.preventDefault();
            if (this.state.id==null){
                alert("dish id should not be empty")
                return;
            }
            if (this.state.name==null){
                alert("dish name should not be empty")
                return;
            }
            if (this.state.price==null){
                alert("dish price should not be empty")
                return;
            }
     
            
    
            $.ajax({
        
                url :URL+'/api/canteen/dish',
                type:'POST',
                datatype :'JSON',
                data: {
                    'id':this.state.id, 
                    'name':this.state.name, 
                    'status':this.state.status, 
                    'price':this.state.price, 
                    'img':this.state.img, 
                    'canteenID':this.props.canteenID, 
    
                
            },
                success: (data)=>{
                    alert("add successfully");
                    document.getElementById("create-course-form").reset();
                    //this.Reset();
                },
                error: (err)=>{
                    console.log("err");
                }
            })
         }
    
         nameChange=(event)=>{
            this.setState({name: event.target.value});
         }
         idChange=(event)=>{
            this.setState({id: event.target.value});
         }
    
         statusChange=(event)=>{
            if (event.target.value)
            this.setState({status: 1});
            else
            this.setState({status: 0});
         }
         priceChange=(event)=>{
            this.setState({price: event.target.value});
         }
         imgChange=(event)=>{
            this.setState({img: event.target.value});
         }
         set_Start_add=()=>{
             if (this.state.Start_add==0)
                this.setState({Start_add: 1});
            else
                this.setState({Start_add: 0});
         }
        render(){
    
            if (this.state.Start_add==0)
            return <button  className="btn btn-primary text-center" onClick={this.set_Start_add}>Add a new menu</button>
            else
            return(<div className="container ">
                <div className="row justify-content-center ">
                <form className="col-md-4 col-xm-4 " role="form" id="create-course-form" onSubmit={this.post_menu}>
            <div className="form-group ">
               
               <label htmlFor="exampleInputEmail1">
                 id
               </label>
               <input name="id" className="form-control "placeholder="0" onChange={this.idChange}/>
             </div>
            <div className="form-group">
               
              <label htmlFor="exampleInputEmail1">
                Name
              </label>
              <input name="name" className="form-control" placeholder="meat"  onChange={this.nameChange}/>
            </div>
    
    
            <div className="form-group">
               
               <label htmlFor="exampleInputEmail1">
                 Price
               </label>
               <input name="price" className="form-control"  placeholder="10"onChange={this.priceChange} />
             </div>
    
            <div className="form-group">
               
              <label htmlFor="exampleInputFile">
                Image
              </label>
              <input type="file" className="form-control-file" onChange={this.imgChange}/>
            </div>
    
            <div className="checkbox">
               
              <label>
                <input type="checkbox"   onChange={this.statusChange} /> Status(Availible or not)
              </label>
            </div> 
    
    
            <button type="submit" className="btn btn-primary" >
              Add 
            </button>
            <button  className="btn btn-warning text-center" onClick={this.set_Start_add}>Cancel</button>
          </form>
          </div>
          </div>
            )
        }
    }
    