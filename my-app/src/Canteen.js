import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000"

class Navbar extends React.Component{

    render(){

        return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
         
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
           <span className="navbar-toggler-icon"></span>
         </button> <a className="navbar-brand btn" onClick={this.props.clickOnProfile}>Profile</a>
         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
           <ul className="navbar-nav">
             <li className="nav-item active">
                <a className="nav-link btn"  onClick={this.props.clickOnMenu}>Menu</a>
             </li>
             <li className="nav-item">
                <a className="nav-link btn"  onClick={this.props.clickOnOrder}>Order</a>
             </li>
           </ul>
           <form className="form-inline">
             <input className="form-control mr-sm-2" type="text" /> 
             <button className="btn btn-primary my-2 my-sm-0" type="submit">
               Search
             </button>
           </form>
           <ul className="navbar-nav ml-md-auto">
 
             <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle btn" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
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

class Carousel extends React.Component{

    render(){
        return(
<div className="carousel slide" id="carousel-733750">
        <ol className="carousel-indicators">
          <li data-slide-to="0" data-target="#carousel-733750" className="active">
          </li>
          <li data-slide-to="1" data-target="#carousel-733750">
          </li>
          <li data-slide-to="2" data-target="#carousel-733750">
          </li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" alt="Carousel Bootstrap First" src="https://www.layoutit.com/img/sports-q-c-1600-500-1.jpg" />
            <div className="carousel-caption">
              <h4>
                Canteen Photo
              </h4>
              <p>
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" alt="Carousel Bootstrap Second" src="https://www.layoutit.com/img/sports-q-c-1600-500-2.jpg" />
            <div className="carousel-caption">
              <h4>
                Second Thumbnail label
              </h4>
              <p>
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              </p>
            </div>
          </div>
        </div> <a className="carousel-control-prev" href="#carousel-733750" data-slide="prev"><span className="carousel-control-prev-icon"></span> <span className="sr-only">Previous</span></a> <a className="carousel-control-next" href="#carousel-733750" data-slide="next"><span className="carousel-control-next-icon"></span> <span className="sr-only">Next</span></a>
      </div>
        )
    }
}

class Thread_comment extends React.Component{
    render(){

        return (
            <div className="media mt-3">
            <a className="pr-3" href="#"><img className="rounded-circle" alt="Bootstrap Media Another Preview" src="https://www.layoutit.com/img/sports-q-c-64-64-2.jpg" /></a>
           <div className="media-body">
             <h5 className="mt-0">
               comment
             </h5>content+{this.props.comment.comtent}
           </div>
         </div>
        )
    }
}

class Thread extends React.Component{

constructor(pros){
    super(pros)
    this.state=({
        comment:[]
    })
}
    get_comment=()=>{

        $.ajax({
            type: "GET",
            url: URL+"api/comment?canteenid="+this.props.data.canteenID,
            success:(res,status)=>{
                this.setState({comment:res})
            },
            error:(err)=>{
                console.log(err)
                alert("fail to get comment")
            }
        })
    }
    render(){
        return(
            <div>
            <img className="mr-3 rounded-circle" alt="Bootstrap Media Preview" src={URL+"api/canteen/img/?id="+this.props.data.dishID} />
            <div className="media-body">
              <h5 className="mt-0">
                dish 1 
              </h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
              { this.state.comment.map(data => 
                <Thread comment={data}/> )}
            </div>    
            </div>
        )
    }
}

class Nested extends React.Component{



    render(){
        return null;
        /*
        return (
            <div className="media bg-warning rounded">
            { this.props.Menu_data.map(data => 
            <Thread data={data}/> )}
          </div>       
        )*/
    }
    
}

class TableRow extends React.Component{
    
    delete_menu=()=>{

        $.ajax({
    
            url :URL+'/api/canteen/dish?id='+this.props.data.id,
            type:'delete',
            datatype :'JSON',
            data: {},
            success: (data)=>{
                alert("delete successfully");
            },
            error: (err)=>{
                console.log("err");
            }
        })
    }
    render(){

        return (
            <tr>   
            <td scope="row"> <a className="btn btn-warning" onClick={this.delete_menu}>delete</a></td>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.status==1?"Offered":"Not Offered"}</td>   
            <td>{this.props.data.price}</td>  
            <td>{this.props.data.canteenID}</td>  
           </tr>
        )
    }
}

class Table extends React.Component{



    render(){
        return(
            <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  ID
                </th>
                <th>
                  Name
                </th>
                <th>
                  Status
                </th>
                <th>
                  Price
                </th>
                <th>
                  CanteenID
                </th>
              </tr>
            </thead>
            <tbody>
        { this.props.Menu_data.map(data => 
            <TableRow data={data}/> )}
            </tbody>
          </table>
        )
    }
}

class Form extends React.Component{

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


class Profile_Modify extends React.Component{

    constructor(props){
        
        super(props);

        this.state={
          
            name:this.props.name,
            id:0,
            password:null,
            form_trigger: 0
        }
        
        }


        put_canteen=(e)=>{
            e.preventDefault();
            //alert(this.props.canteenID);
            //console.log(this.state.img)
            /*
            $.ajax({
        
                url :URL+'/api/canteen/',
                type:'PUT',
                datatype :'JSON',
                data: {
                    'id':this.state.id, 
                    'name':this.state.name, 
                    'password':this.state.password
            },
                success: function(data){
                    console.log("update canteen");
                },
                error: function(err){
                    console.log("err");
                }
            })
            console.log(this.state.img)
            */

            let file = this.state.img;
            const formdata = new FormData();
            formdata.append('img', file);
    
        const url = URL+'/api/canteen/img?id='+this.state.id;
        fetch(url, {
            method: 'POST',
            body: formdata,
            headers: {
                "Content-Type": false
            }
        }).then(response => {console.log("success")})
        .catch(error => console.log(error));



         }



         

    nameChange=(event)=>{
        this.setState({name: event.target.value});
     }
    idChange=(event)=>{
        this.setState({id: event.target.value});
     }

    passwordChange=(event)=>{
        this.setState({password: event.target.value});
     }

     imgChange=(event)=>{
        this.setState({img: event.target.files[0]});
     }
     change_form_trigger=()=>{
        if (this.state.form_trigger==0)
            this.setState({form_trigger:1})
        else
        this.setState({form_trigger:0})
     }
    render(){
        if (this.state.form_trigger==0)
        return <button className="btn btn-primary"onClick={this.change_form_trigger}>modify</button>
        else
        return(
            <div className="container ">
            <div className="row justify-content-center ">
            <form role="form col-md-4 col-sm-4" id="uploadForm" enctype="multipart/form-data" onSubmit={this.put_canteen}>
        <div className="form-group">
           
           <label htmlFor="exampleInputEmail1">
             id
           </label>
           <input name="id" className="form-control" onChange={this.idChange}/>
         </div>
        <div className="form-group">
           
          <label htmlFor="exampleInputEmail1">
            Name
          </label>
          <input name="name" className="form-control" onChange={this.nameChange}/>
        </div>

        <div className="form-group">      
          <label htmlFor="exampleInputPassword1">
            Password
          </label>
          <input name="status" className="form-control" onChange={this.passwordChange} />
        </div>

        <div className="form-group">
           <label htmlFor="exampleInputFile">
             Image
           </label>
           <input type="file" name="img"className="form-control-file" onChange={this.imgChange}/>
         </div>
        <button type="submit" className="btn btn-primary" >
          Modify
        </button>
        <button className="btn btn-warning"onClick={this.change_form_trigger}>Cancel</button>
      </form>
      </div>
      </div>
        )    
    }
}
class Profile extends React.Component{


    render(){
        if (this.props.PageToShow==2)
        return(<div>
            <p>id: {this.props.canteenID}</p>
            <Profile_Modify />
            </div>)
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


