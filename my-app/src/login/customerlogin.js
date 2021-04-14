import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000/api"

class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({

            id: null,
            password: null,
            open_or_not: 1
        })
    }
    
    login = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: URL + "/login/user",
            data:JSON.stringify({"id":this.state.id, "password":this.state.password}),
            contentType:"application/json",
            success: (res) => {
                console.log("result: " + res)
                if(res == "success"){
                    this.props.customerlogin(this.state.id)
                    this.setState({
                        open_or_not: 0
                    })
                }
                //this.props.customerlogin(this.state.id)
            }
        })
    }

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
        if (this.state.open_or_not)
            return (

                <div className="container ">
                    <div className="row justify-content-center ">
                    <form  className="col-md-4 col-xm-4 "noValidate method="POST">
                        <div id="form_widget">
                            <div  className="form-group ">
                                Your Id:<input type="text" placeholder="id" id="box_name" name="id"  className="form-control"
                                    οnfοcus="this.value=''" onChange={(e) => this.id_change(e)} οnblur="if(this.value=='')this.value='username'" />

                            Password:<input type="password" placeholder="password" id="box_pass" name="password" className="form-control"
                                    οnfοcus="this.value=''" onChange={(e) => this.password_change(e)} οnblur="if(this.value=='')this.value='password'" />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit"  οnmοuseοver="this.style.backgroundColor='#FF8D00'"
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