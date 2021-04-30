import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000/api"

class login extends React.Component {
    //props cookies state
    constructor(props) {
        super(props)
        this.state = ({

            id: null,
            password: null,
            username: null,
            open_or_not: 1
        })
    }
    //register function including ajax to exchange information with backend
    register = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: URL + "/register",
            data: JSON.stringify({ "id": this.state.id, "username": this.state.username, "password": this.state.password }),
            contentType: "application/json",
            success: (res) => {
                console.log("result: " + res)
                if (res == 'register success') {
                    alert('success! Please go back to login page to login')

                }
                else if(res == "empty"){
                    alert('username,id, password cannnot be empty')
                }
                else if(res == 'id must be integers, please check again'){
                    alert('id must be integers, please check again')
                }
                else if(res == "password’s length should be less than 40, please check  again"){
                    alert("password’s length should be less than 40, please check  again")
                }
                else {
                    alert('register fail, please use unique id')
                }
            }

            //this.props.customerlogin(this.state.id)
        })
    }

    //functions to get changes session information
    id_change = (e) => {

        this.setState({
            id: e.target.value
        })
    }

    username_change = (e) => {

        this.setState({
            username: e.target.value
        })
    }

    password_change = (e) => {

        this.setState({
            password: e.target.value
        })
    }
    //html
    render() {
        if (this.props.login_register == 1)
            return (

                <div className="container ">
                    <div className="row justify-content-center ">
                        <form className="col-md-4 col-xm-4 bg-dark text-light rounded" noValidate method="POST">
                            <div id="form_widget">
                                <div className="form-group ">
                                    Your Id:<input type="text" className="form-control" placeholder="id" id="box_name" name="id"
                                        οnfοcus="this.value=''" onChange={(e) => this.id_change(e)} οnblur="if(this.value=='')this.value='id'" />

                            Username:<input type="text" className="form-control" placeholder="username" id="box_name" name="username"
                                        οnfοcus="this.value=''" onChange={(e) => this.username_change(e)} οnblur="if(this.value=='')this.value='username'" />

                            Password:<input type="password" className="form-control" placeholder="password" id="box_pass" name="password"
                                        οnfοcus="this.value=''" onChange={(e) => this.password_change(e)} οnblur="if(this.value=='')this.value='password'" />
                                </div>
                            </div>

                            <div>
                                <button className="btn btn-warning" type="submit" οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                    οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.props.BackToLogin}>Back to login</button>
                            </div>
                            <div>
                                <button className="btn btn-primary" type="submit" οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                    οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.register}>Register</button>
                            </div>

                        </form>
                    </div>
                </div>

            )
        else
            return null;
    }
}
export default login;