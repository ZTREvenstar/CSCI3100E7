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
            open_or_not: 1
        })
    }
    //login function including ajax to exchange information with backend
    login = (e) => {
        console.log("here")
        console.log("id: " + this.state.id)
        console.log("password: " + this.state.password)

        if (this.state.id == null || this.state.password == null) {
            alert("worng id or password")
        }
        else {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: URL + "/login/canteen",
                data: JSON.stringify({ "id": this.state.id, "password": this.state.password }),
                contentType: "application/json",
                success: (res) => {
                    console.log("result: " + res)
                    if (res == "success") {
                        this.props.canteenlogin(this.state.id)
                        this.setState({
                            open_or_not: 0
                        })
                    }
                    else {
                        alert("worng id or password")
                    }
                    //this.props.customerlogin(this.state.id)
                }
            }
            )
        }
    }
    //functions to get changes session information
    id_change = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    password_change = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        if (this.props.login_register == 0 && this.props.customer_canteen == 1)
            return (

                <div className="container ">
                    <div className="row justify-content-center ">
                        <form className="col-md-4 col-xm-4 bg-dark text-light rounded" noValidate method="POST">
                            <h4>You are logging in as<sapn className="text-danger"> canteen</sapn></h4>
                            <div>
                                <button className="btn btn-success " οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                    οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.props.switchTocustomer}>switch To customer</button>
                            </div>
                            <div id="form_widget">
                                <div className="form-group " >
                                    Your Id:<input className="form-control" type="text" placeholder="id" id="box_name" name="id"
                                        οnfοcus="this.value=''" onChange={(e) => this.id_change(e)} οnblur="if(this.value=='')this.value='username'" />
                                </div>
                                <div className="form-group ">
                                    Password:<input className="form-control" type="password" placeholder="password" id="box_pass" name="password"
                                        οnfοcus="this.value=''" onChange={(e) => this.password_change(e)} οnblur="if(this.value=='')this.value='password'" />
                                </div>
                            </div>


                            {/* <div>
                        <button className="btn btn-warning" type="submit"  οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.props.BackToRegister}>Go register</button>
                                </div> */}
                            <div>
                                <button className="btn btn-primary" type="submit" οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                    οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.login}>Login</button>
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