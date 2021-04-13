import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000/api"

const arr = [
    "onSignIn",
    "onChangeName",
    "onChangePwd"
]

class login extends React.Component {
    login = () => {
        $.ajax({
            type: 'POST',
            url: URL + "/login",
            success: (res) => {
                console.log("result: " + res)
                if (!res) {
                    alert("Wrong password or user id!")
                }
            }
        })
    }


    render() {
        return (
            <div>
                <form noValidate>
                    <div id="form_widget">
                        <div className={styleMedia.inputGroups}>
                            Your Id:<input type="text" placeholder="id" id="box_name" name="id" className={styleMedia.input}
                                οnfοcus="this.value=''" οnblur="if(this.value=='')this.value='username'" />

                            Password:<input type="password" placeholder="password" id="box_pass" name="password" className={styleMedia.input}
                                οnfοcus="this.value=''" οnblur="if(this.value=='')this.value='password'" />
                        </div>
                    </div>
                    <div>
                        <button className={styleMedia.button} type="submit" class="btn" οnmοuseοver="this.style.backgroundColor='#FF8D00'"
                            οnmοuseοut="this.style.backgroundColor='#FC5628'" onClick={this.login}>Login</button>
                    </div>
                </form>
            </div>


        )
    }
}
export default login;