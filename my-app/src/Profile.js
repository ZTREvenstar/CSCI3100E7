import React, { useState } from 'react'
import $ from "jquery"
const URL = "http://localhost:5000";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            section: 0,
            username: '',
            updated:0,
        };
    };

    componentDidMount() {
        var that = this
        this.serverRequest = $.ajax({
            url: 'http://localhost:5000/api/profile/info',
            type:'POST',
            data: JSON.stringify({'id':this.props.id}),
            contentType: "application/json",
            dataType:'JSON',
            async:true,
            success: function(data,status){
                console.log("succeed");
                console.log(data);
                that.setState({
                    username: data[0].username,
                    id: data[0].id,
                })
            },
            error:function(data,status){
                console.log("error");
                console.log(data);
            }
        });
    }
     
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleClick=(index)=>{
        if(this.state.section === index){
            this.setState({
                section: 0,
            });
            console.log('hide display');
        } else{
            this.setState({
                section: index,
            });
            console.log('show display #'+index)
        }
    }

    renderPic=()=>{
       // console.log("changing states");
        this.setState({
            updated: this.state.updated+1,
        })
    }

    renderUsername=(update)=>{
        console.log("changing username to" + update);
        this.setState({
            username: update,
        })
    }

    render(){
        let display = null;
        switch(this.state.section){
            case 0:
                display = <></>
                break;
            case 1:
                display = <ChangeInfo id = {this.props.id} handleSuccess = {this.handleClick} handleUsername = {this.renderUsername}/>
                break;
            case 2:
                display = <ChangePW id = {this.props.id} handleSuccess = {this.handleClick} />
                break;
            case 3:
                display = <UploadPic id = {this.props.id} handleSuccess = {this.handleClick} handlePicChange = {this.renderPic}/>
                break;
            default:
                display = <></>
        }
        return(
            <>
            <header className = "container">
                <h1 className = "my-4">Personal Information</h1>
            </header>
            <main className = "container">
            <div class="row my-2 d-flex align-items-center" id = "Profile">
                <div id = "profileInfo" className="col-lg-8 col-md-6">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th scope="row">User ID: </th>
                            <td id = "id">{this.props.id}</td>
                        </tr>
                        <tr>
                            <th scope="row">Profile Name: </th>
                            <td id = "profileName">{this.state.username}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div id="profilePicture" className = "col-lg-4 col-md-6">
                    <picture>
                    <img id = "profilePic" src={URL+"/public/customer/"+ this.props.id + ".png?"+this.state.updated} className="img-thumbnail" style={{height: 200}} alt={"no profile pic"}></img>
                    </picture>
                </div>
                </div>
                <div id="buttons" className = "d-flex flex-wrap my-2 justify-content-center" >
                    <button type="button" className="btn btn-primary m-2" onClick = {(e)=>this.handleClick(1)} >change Personal Information</button>
                    <button type="button" className="btn btn-primary m-2" onClick = {(e)=>this.handleClick(2)} >change Password</button>
                    <button type="button" className="btn btn-primary m-2" onClick = {(e)=>this.handleClick(3)} >Upload Profile Pic</button>
                </div>
                {display}
            </main>
        </>
        );
    };
}

class ChangeInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username:''};
    
      //  this.handleChange = this.handleChange.bind(this);
      //  this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit=(event)=>{
        event.preventDefault();

        //alert('trying to submit a form');
        let newusername = this.state.username
        this.serverRequest = $.ajax({
            url: 'http://localhost:5000/api/profile/updateInfo',
            type:'POST',
            data: JSON.stringify({
                'username':this.state.username,
                'id':this.props.id,
            }),
            contentType: "application/json",
            async:true,
            success: (data)=>{
                console.log("succeed");
                console.log(data);
                if(data == 'success'){
                    this.props.handleUsername(newusername)
                }
                this.props.handleSuccess(1);
            },
            error:function(data,status){
                console.log("error");
                console.log(data);
            }
        });
        
    }

    usernameChange=(event)=>{
        this.setState({
            username: event.target.value
        })
    }


    render(){
        return(
            <div>
                <form id = "changeInfo" method = "post" onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="InputProfileName">Profile Name</label>
                        <input type="text" className="form-control"  name="username" placeholder="Enter New User Name" onChange = {this.usernameChange}></input>email
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    };
}

class ChangePW extends React.Component{

    constructor(props) {
        super(props);
        this.state = {pw: '', confirm:''};
    
      //  this.handleChange = this.handleChange.bind(this);
      //  this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.state.pw!=this.state.confirm){
            window.alert("pleas enter the same password twice")
            return;
        }
        //alert('trying to submit a form');
        this.serverRequest = $.ajax({
            url: 'http://localhost:5000/api/profile/updatePW',
            type:'POST',
            data: JSON.stringify({
                'pw':this.state.pw,
                'id':this.props.id,
            }),
            contentType: "application/json",
            async:true,
            success: (data)=>{
                console.log("succeed");
                console.log(data);
                this.props.handleSuccess(2);
            },
            error:function(data){
                console.log("error");
                this.props.handleSuccess(2);
            }
        });
        
    }

    pwChange=(event)=>{
        this.setState({
            pw: event.target.value
        })
    }

    confirmChange=(event)=>{
        this.setState({
            confirm: event.target.value
        })
    }
    

    render(){
        return(
                <div>
                    <form id = "changePassword" method = "post" onSubmit = {this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="InputPassword">Enter Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter New Password" onChange = {this.pwChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" placeholder="Repeat New Password" onChange = {this.confirmChange}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div> 
        );
    };
}

class UploadPic extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            img:null,
        };
    
      //  this.handleChange = this.handleChange.bind(this);
      //  this.handleSubmit = this.handleSubmit.bind(this);
    }

    imgChange=(event)=>{
        this.setState({img: event.target.files[0]});
        console.log(event.target.files[0]);
    }
    
    handleSubmit=(event)=>{
        event.preventDefault();

        let file = this.state.img;
        let formdata = new FormData();
        formdata.append('id',this.props.id);
        formdata.append('img', file);
        console.log(formdata);
        this.serverRequest = $.ajax({
            url: 'http://localhost:5000/api/profile/updateProfilePic',
            type:'POST',
            data: formdata,
            contentType: false, processData: false,
            async:true,
            success: (data)=>{
                window.alert("succeeded, now updating parent component");
                console.log(data);
                this.props.handleSuccess(3)
                this.props.handlePicChange();
            },
            error:function(data){
                console.log("error");
                console.log(data);
            }
        });
    }


    render(){
        return(
        <div>
            <form id ="changeProfilePic" method="post" onSubmit = {this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor ="chooseProfilePic">Choose Profile Pic</label>
                    <input id="chooseProfilePic" name="chooseProfilePic" type="file" className="form-control-file" onChange = {this.imgChange}></input> 
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div> )        
    }
}

/*
<div className="row my-2" id = "Profile">

                <div>
                    <form id = "changeProfileInfo">
                        <div className="form-group">
                            <label htmlFor="InputProfileName">Profile Name</label>
                            <input type="text" className="form-control" id = "profileName" name="profileName" placeholder="Enter New Profile Name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputEmailAddress">Email address</label>
                            <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>  
                <div>
                    <form id = "changePassword">
                        <div className="form-group">
                            <label htmlFor="InputPassword">Password</label>
                            <input type="password" className="form-control" id="InputPassword" placeholder="Enter New Password"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ConfirmPassword">Password</label>
                            <input type="password" className="form-control" id="ConfirmPassword" placeholder="Repeat New Password"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div> 
                <div>
                    <form id ="changeProfilePic" action="http://localhost:3000/updateProfilePic" method="post" enctype="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor ="chooseProfilePic">Choose Profile Pic</label>
                            <input id="chooseProfilePic" name="chooseProfilePic" type="file" className="form-control-file">   </input> 
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div> 

 */
export default Profile;