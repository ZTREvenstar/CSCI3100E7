import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000/api"

class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({

            id: null,
            password: null,
            username:null,
            open_or_not: 1
        })
    }
    
    register = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: URL + "/register",
            data:JSON.stringify({"id":this.state.id,"username":this.state.username, "password":this.state.password}),
            contentType:"application/json",
            success: (res) => {
                console.log("result: " + res)
                }
                //this.props.customerlogin(this.state.id)
        })
    }

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
    render() {
        if (this.props.login_register==1)
            return (

                <div className="container ">
                    <div className="row justify-content-center ">
                    <form className="col-md-4 col-xm-4 bg-dark text-light rounded"noValidate method="POST">
                        <div id="form_widget">
                            <div className="form-group ">
                            Your Id:<input type="text" className="form-control"placeholder="id" id="box_name" name="id" 
                                    οnfοcus="this.value=''" onChange={(e) => this.id_change(e)} οnblur="if(this.value=='')this.value='id'" />

                            Username:<input type="text" className="form-control"placeholder="id" id="box_name" name="id" 
                                    οnfοcus="this.value=''" onChange={(e) => this.username_change(e)} οnblur="if(this.value=='')this.value='username'" />

                            Password:<input type="password" className="form-control"placeholder="password" id="box_pass" name="password" 
                                    οnfοcus="this.value=''" onChange={(e) => this.password_change(e)} οnblur="if(this.value=='')this.value='password'" />
                            </div>
                        </div>

                        <div>
                            <button className="btn btn-warning"type="submit"  οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.props.BackToLogin}>Back to login</button>
                        </div>
                        <div>
                            <button className="btn btn-primary"type="submit"  οnmοuseοver="this.style.backgroundColor='#FF8D00'"
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