import React from "react";
import $ from "jquery";
import DishDet from "./NewCom.js";
const URL = "http://54.227.0.209:5000"

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
            url:URL + "/api/com/canteen",
            async:false,
            success:(res)=>{
            this.setState({all_canteen:res,userID:this.props.uid});
            //this.props.updateCN(this.state.name,res.length);
                        }
        });
        
    }
    changeCan=(tmpid)=>{
        //console.log(eve.target.parentNode.id);
        console.log(tmpid);
        this.setState({cur_canteen:tmpid,show_cur_canteen:(this.state.show_cur_canteen+1)%2});
    }
    render(){
        if(this.props.PageToShow!=2){
            return(<></>)
        }
        console.log("rendering menu");
        
            return(<div><div >
                {   
                this.state.all_canteen.map(c => 
                    { if(this.state.show_cur_canteen == 0 || (this.state.show_cur_canteen==1 && this.state.cur_canteen==c.id)) {return (
                   <div key={c.id} id={c.id} className="card d-inline-block m-2 " onClick = {()=>this.changeCan(c.id)} >
                        <img src={URL + "/public/canteen/"+c.id+".png"} alt="{file.remarks}" className="img-fluid" style = {{ height: 140}}></img>
                        <div className="card-body">
                            <h3 className="card-title">{c.name}</h3>
                            
                        </div>
                   </div>)}
                   }
                 )
                }
                </div>
                <div>
                <UserMenu show={this.state.show_cur_canteen} cid={this.state.cur_canteen} uid={this.state.userID} BackToCanteen = {this.changeCan}/>
                </div>
                </div>
                )
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
            url:URL + "/api/com/canteen/"+cid,
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
                <>
                <button type="button" className="btn btn-primary m-2" onClick={(e)=>this.props.BackToCanteen(this.state.canteenID)}>Back To Canteen List</button>
                <div className = "d-flex flex-wrap justify-content-center">       
                    <ul className = "list-group w-75 ">{this.state.dish.map(d=><Dish did={d.id} name={d.name} uid={this.props.uid}/>)}</ul>
                </div>
                </>);
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
      order=()=>{
          //console.log("aadadadadada");
          $.ajax({
        
            url :URL + '/api/order/makeorder',
            type:'GET',
            datatype :'JSON',
            data: {
            cid:this.state.uid,
            did:this.state.id
},
            success: (data)=>{
                alert("order placed");
            },
            error: (err)=>{
                console.log("err");
            }
        }) 
      }
    render(){
        return(<li className="list-group-item" key={this.state.id} id={this.state.id}>
            <a>{this.state.name}</a>
            <button type="button" className="btn btn-primary m-2" onClick={this.order}>order</button>
            <button type="button" className="btn btn-primary m-2" onClick={this.showD}>show detail</button>
            {
                (this.state.show == 1) && <DishDet id={this.state.id}  did={this.state.uid} name={this.state.name} show={this.state.show}/>
                
            }
        </li>);
    }
}

export default UserInt;