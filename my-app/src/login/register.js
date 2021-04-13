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
        if (this.state.open_or_not)
            return (

                <div>
                    <form noValidate method="POST">
                        <div id="form_widget">
                            <div className={styleMedia.inputGroups}>
                            Your Id:<input type="text" placeholder="id" id="box_name" name="id" className={styleMedia.input}
                                    οnfοcus="this.value=''" onChange={(e) => this.id_change(e)} οnblur="if(this.value=='')this.value='id'" />
                            
                            Username:<input type="text" placeholder="id" id="box_name" name="id" className={styleMedia.input}
                                    οnfοcus="this.value=''" onChange={(e) => this.username_change(e)} οnblur="if(this.value=='')this.value='username'" />

                            Password:<input type="password" placeholder="password" id="box_pass" name="password" className={styleMedia.input}
                                    οnfοcus="this.value=''" onChange={(e) => this.password_change(e)} οnblur="if(this.value=='')this.value='password'" />
                            </div>
                        </div>
                        <div>
                            <button className={styleMedia.button} type="submit" className={styleMedia.input} οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                                οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.register}>Register</button>
                        </div>
                    </form>
                </div>


            )
        else
            return null;
    }
}
export default login;