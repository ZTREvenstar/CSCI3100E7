import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000"

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
            if (this.props.canteenID==null|| ((this.state.name==null||this.state.password==null) && this.state.img==null)){
                alert("please enter valid information");
            }
            //alert(this.props.canteenID);
            //console.log(this.state.img)
            else if(this.state.img==null){
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
                    this.change_form_trigger();
                },
                error: function(err){
                    console.log("err");
                }
            })
        }else   if ( this.state.img!=null){
                let file = this.state.img;
                console.log(file);
                var formdata = new FormData();
                formdata.append('id', this.props.canteenID);
                formdata.append('img', file);
                console.log("logging file")
                console.log(formdata);
        
            const url = URL+'/api/canteen/img';
            
            this.serverRequest = $.ajax({
                url: url,
                type:'POST',
                data: formdata,
                contentType: false, processData: false,
                async:true,
                success: (data)=>{
                    //window.alert("succeeded, now updating parent component");
                    //console.log(data);
                    this.props.set_random();
                    this.change_form_trigger();
                },
                error:function(data){
                    console.log("error");
                    console.log(data);
                }
            });
            }




         }



         

    nameChange=(event)=>{
        this.setState({name: event.target.value});
     }


    passwordChange=(event)=>{
        this.setState({password: event.target.value});
     }

     imgChange=(event)=>{
        if (event.target.files[0].size/1024 > 2000){
        alert("the image size should be less than 2MB!")
        }  
        else{
        this.setState({img: event.target.files[0]});
        }
        
     }
     change_form_trigger=()=>{
        if (this.state.form_trigger==0)
            this.setState({form_trigger:1})
        else
        this.setState({form_trigger:0})
     }
    render(){
        if (this.state.form_trigger==0)
        return <button className="btn btn-primary my-2"onClick={this.change_form_trigger}>modify</button>
        else
        return(
            <div className="container ">
            <div className="row justify-content-center ">
            <form role="form col-md-4 col-sm-4" id="uploadForm" encType="multipart/form-data" onSubmit={this.put_canteen}>
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
        <button type="submit" className="btn btn-primary m-2" >
          Modify Password
        </button>
        <div className="form-group">
           <label htmlFor="exampleInputFile">
             Image
           </label>
           <input type="file" name="img"className="form-control-file" onChange={this.imgChange}/>
         </div>
        <button type="submit" className="btn btn-primary m-2" >
          Modify Canteen Picture
        </button>
        <br />
        <button className="btn btn-warning m-2"onClick={this.change_form_trigger}>Cancel</button>
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
            <h4 className = "my-2">Canteen ID: {this.props.canteenID}</h4>
            <Profile_Modify set_random={this.props.set_random}canteenID={this.props.canteenID}/>
            </div>)
        else
        return null
    }
}
