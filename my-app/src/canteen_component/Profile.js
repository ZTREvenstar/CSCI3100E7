import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000"

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
            if (this.props.canteenID==null||this.state.name==null||this.state.password==null){
                alert("please enter valid information")
                return null;
            }

            //alert(this.props.canteenID);
            //console.log(this.state.img)
            /*
            $.ajax({
        
                url :URL+'/api/login/canteen?id='+this.props.canteenID,
                type:'PUT',
                datatype :'JSON',
                data: {

                    'username':this.state.name, 
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
    
        const url = URL+'/api/canteen/img?id='+this.props.canteenID;
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
            Name
          </label>
          <input name="name" className="form-control" onChange={this.nameChange}/>
        </div>

        <div className="form-group">      
          <label htmlFor="exampleInputPassword1">
            Password
          </label>
          <input type="password" name="status" className="form-control" onChange={this.passwordChange} />
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
export default class Profile extends React.Component{


    render(){
        if (this.props.PageToShow==2)
        return(<div>
            <p>id: {this.props.canteenID}</p>
            <Profile_Modify canteenID={this.props.canteenID}/>
            </div>)
        else
        return null
    }
}