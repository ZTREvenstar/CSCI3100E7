import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000/api"

const arr = [
    "onSignIn",
    "onChangeName",
    "onChangePwd"
]



class login extends React.Component {
    constructor(props){
        super(props)
        this.state=({
      
          id:null,
          password: null,
          open_or_not:1  
        })
      }

    login = () => {
        $.ajax({
            type: 'POST',
            url: URL + "/login",
            success: (res) => {
                console.log("result: " + res)
 
                this.props.customerlogin(this.state.id)
                this.setState({
                    open_or_not:0
                })
                //this.props.customerlogin(this.state.id)
                if (!res) {
                    alert("Wrong password or user id!")
                }
            }
        })
    }

    id_change=(e)=>{

        this.setState({
            id:e.target.value
        })
    }
    password_change=(e)=>{
        
        this.setState({
            password:e.target.value
        })
    }
    render() {
        if (this.state.open_or_not)
        return (

            <div>
                <form noValidate>
                    <div id="form_widget">
                        <div className={styleMedia.inputGroups}>
                            Your Id:<input type="text" placeholder="id" id="box_name" name="id" className={styleMedia.input}
                                οnfοcus="this.value=''" onChange={(e)=>this.id_change} οnblur="if(this.value=='')this.value='username'" />

                            Password:<input type="password" placeholder="password" id="box_pass" name="password" className={styleMedia.input}
                                οnfοcus="this.value=''" onChange={(e)=>this.password_change} οnblur="if(this.value=='')this.value='password'" />
                        </div>
                    </div>
                    <div>
                        <button className={styleMedia.button} type="submit" class="btn" οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                            οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.login}>Login</button>
                    </div>
                </form>
            </div>


        )
        else
            return null;
    }
}
export default login;