import React from "react";
import $ from "jquery";
import DishDet from "./NewCom.js";

class UserInt extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userID:0,
            all_canteen:[],
            cur_canteen:0,
            show_cur_canteen:0
        }
    }
    componentDidMount(){
        //get all canteen id
        //setstate
        $.ajax({
            url:"http://localhost:5000/api/com/canteen",
            async:false,
            success:(res)=>{
            this.setState({all_canteen:res,userID:this.props.uid});
            //this.props.updateCN(this.state.name,res.length);
                        }
        });
        
    }
    changeCan=(eve)=>{
        //console.log(eve.target.parentNode.id);
        var tmpid=eve.target.parentNode.id;
        console.log(tmpid);
        this.setState({cur_canteen:tmpid,show_cur_canteen:1});
    }
    render(){
        return(
            <div>
                {this.state.all_canteen.map(c=><div id={c.id}>
                    <h1>{c.name}</h1>
                    <button onClick={this.changeCan}>see menu</button>
                </div>)}
                <div>
                    <UserMenu show={this.state.show_cur_canteen} cid={this.state.cur_canteen} uid={this.state.userID}/>
                </div>
            </div>
        );
    }

}

class UserMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            canteenID:0,
            uid:0,
            visible:0,
            dish:[]
        };
        
    }
    componentDidMount(){
           this.updateSelf();
        }
    updateSelf(){
        this.setState({
            canteenID:this.props.cid,
            uid:this.props.uid,
            visible:this.props.show
        });
        this.updateDish(this.props.cid);
        
    }
    updateDish=(cid)=>{
        //get canteen dish
        $.ajax({
            url:"http://localhost:5000/api/com/canteen/"+cid,
            async:false,
            success:(res)=>{
            this.setState({dish:res});
            //this.props.updateCN(this.state.name,res.length);
                        }
        });
        
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            canteenID:nextProps.cid,
            uid:nextProps.uid,
            visible:nextProps.show
        });
        //console.log(nextProps.cid);
        this.updateDish(nextProps.cid);
      }
    render(){
        if(this.state.visible==0){
            return(<div></div>);
        }
        else{
            return(
                <ul>{this.state.dish.map(d=><Dish did={d.id} name={d.name} uid={this.props.uid}/>)}</ul>);
        }
        
    }
    
}
const buttonHTML=["show detail","close detail"];
class Dish extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            id:0,
            uid:0,
            show:0
        }
    }
    componentDidMount(){
        this.setState({
            name:this.props.name,
            id:this.props.did,
            uid:this.props.uid
        })
        console.log(this.state.id)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            name:nextProps.name,
            id:nextProps.did,
            uid:nextProps.uid
        });
      }
      showD=(eve)=>{
            var tmp=this.state.show;
          eve.target.innerHTML=buttonHTML[1-tmp];
          this.setState({show:1-tmp});
      }
    render(){
        return(<li>
            <a>{this.state.name}</a>
            <button onClick={this.showD}>show detail</button>
            <DishDet id={this.state.id}  did={this.state.uid} name={this.state.name} show={this.state.show}/>
        </li>);
    }
}

export default UserInt;