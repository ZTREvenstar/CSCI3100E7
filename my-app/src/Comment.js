import React from "react";
import $ from "jquery";
class CommentIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
        cid:3,
        dish:[]
}
}
    componentDidMount(){
        $.ajax({type:'GET',url:"http://localhost:5000/api/com/dish",async :false,
        success:(res)=>{ 
            console.log(res);
            this.setState({dish:res}); 
                        } 
        })
    }
    render(){
    return(
        <div>
            <h1>Canteen Dish Review</h1>
            <div>
                {this.state.dish.map(c => <Dish name={c.name} id={c.id} did={this.state.cid}/>)}
            </div> 
        </div>
    );
    }
}

class Dish extends React.Component{
    constructor(props){
        super(props);
        this.state={
        name:"",
        id:"",
        comments:[]
}
}
    componentDidMount(){
        this.setState({name:this.props.name,id:this.props.id});
        //console.log("gggggggg"+this.state.name);
        $.ajax({type:'GET',url:"http://localhost:5000/api/com/comment/"+this.props.id,
        async:false,
        success:(res)=>{
            //console.log(res[0]);
            this.setState({comments:res});
                        }
        });
    }
    updateC=()=>{
        $.ajax({type:'GET',url:"http://localhost:5000/api/com/comment/"+this.props.id,
        async:false,
        success:(res)=>{
            this.setState({comments:res});
                        }
        });
    }
    render(){
        return (
        <div>
          <a>Dish Name:{this.props.name}</a>
          <div>
              {this.state.comments.map(c=><Comment id={c.id} cid={c.customerID} content={c.content} ln={c.likeNum} update={this.updateC} did={this.props.did}/>)}
          </div>
          <div>
              <CForm update={this.updateC} did={this.props.did} dish={this.state.id}/>
          </div>
         </div> 
      ); 
    }
    
}

class CForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        //alert('提交的名字: ' + this.state.value);
        $.ajax({type:'POST',url:"http://localhost:5000/api/com/addC/cid/"+this.props.did+"/dishId/"+this.props.dish+"/content/"+this.state.value,
        async :false,
        success:(res)=>{ 
            this.props.update();
             //console.log(res.cid);
                        } 
        });
        this.setState({value: ""});
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              comment:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="提交" />
          </form>
        );
      }

}

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={
        did:0, //current login id
        cid:0, //cid of comment creator
        id:0, //id of comment
        likeNum:0,
        content:""
}
}
    componentDidMount(){
        //console.log("adada"+this.props.content);
        this.setState({likeNum:this.props.ln,id:this.props.id,did:this.props.did,cid:this.props.cid,content:this.props.content});
    }
    likeC=()=>{
        $.ajax({type:'POST',url:"http://localhost:5000/api/com/like/"+this.props.id, async:false,
        success:(res)=>{
            var num=res[0].LN;
            this.setState({likeNum:num});
        }
        })
    }
    DeleteC=()=>{
        $.ajax({type:'POST',url:"http://localhost:5000/api/com/deleteC/"+this.props.id+"/"+this.props.did, async: false,
            success:(res)=>{
                console.log("result : "+res);
                if(!res){
                    alert("u can only delete your own comments!");
                }
            }
          });
          this.props.update();
    }
    render(){
        return(
            <div>
                <a>id {this.props.cid}</a>
                <a>{this.props.content}</a>
                <div className="row">
                    <button className="col" onClick={this.likeC}>like:{this.state.likeNum}</button>
                    <button className="col" onClick={this.DeleteC}>delete</button>
                </div>
            </div>
        );
    }
}

export default CommentIn;