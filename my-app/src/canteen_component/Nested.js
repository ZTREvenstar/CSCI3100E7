import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000"

class Thread_comment extends React.Component{
    render(){

        return (
            <div className="media mt-3">
            <a className="pr-3" href="#"><img className="rounded-circle" alt="Bootstrap Media Another Preview" src="https://www.layoutit.com/img/sports-q-c-64-64-2.jpg" /></a>
           <div className="media-body">
             <h5 className="mt-0">
               comment
             </h5>content+{this.props.comment.comtent}
           </div>
         </div>
        )
    }
}

class Thread extends React.Component{

constructor(pros){
    super(pros)
    this.state=({
        comment:[]
    })
}
    get_comment=()=>{

        $.ajax({
            type: "GET",
            url: URL+"api/comment?canteenid="+this.props.data.canteenID,
            success:(res,status)=>{
                this.setState({comment:res})
            },
            error:(err)=>{
                console.log(err)
                alert("fail to get comment")
            }
        })
    }
    render(){
        return(
            <div>
            <img className="mr-3 rounded-circle" alt="Bootstrap Media Preview" src={URL+"api/canteen/img/?id="+this.props.data.dishID} />
            <div className="media-body">
              <h5 className="mt-0">
                dish 1 
              </h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
              { this.state.comment.map(data => 
                <Thread comment={data}/> )}
            </div>    
            </div>
        )
    }
}

export default class Nested extends React.Component{



    render(){
        return null;
        /*
        return (
            <div className="media bg-warning rounded">
            { this.props.Menu_data.map(data => 
            <Thread data={data}/> )}
          </div>       
        )*/
    }
    
}