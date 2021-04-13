import React from "react";
import $ from "jquery";
import propic from './pic/green.png';
import equal from 'fast-deep-equal';
import ReactStars from "react-rating-stars-component";

const sortChoice=[
    {uuid:'1',name:'Choose filter'},
    {uuid:'2',name:'Number of Helpful'},
    {uuid:'3',name:'Bad comments only'}
];
class Dish extends React.Component{
    constructor(props){
        super(props);
        this.state={
        name:"",
        id:"",
        did:"",
        comments:[],
        rating:0.0       //overall rating
};
this.updateSelf=this.updateSelf.bind(this);
this.updateC=this.updateC.bind(this);
this.sortDishH=this.sortDishH.bind(this);
this.filterDish=this.filterDish.bind(this);
this.sortDish=this.sortDish.bind(this);
}
    updateSelf=()=>{
        this.setState({id:this.props.id,did:this.props.did});
        //console.log("gggggggg"+this.props.name);
        $.ajax({type:'GET',url:"http://localhost:5000/api/com/comment/"+this.props.id,
        async:false,
        success:(res)=>{
            //console.log(res);
            var avg=res.reduce((r,c)=>r+c.rating,0)/res.length;
            setTimeout(()=>{
                this.setState({comments:res,rating:avg});
            },0);
            //console.log(res);
            //this.props.updateCN(this.props.name,res.length,avg);
                        }
        });
    }
    componentDidMount(){
        this.updateSelf();
    }
    componentDidUpdate(prevProps){
        if(!equal(this.props.id, prevProps.id)) 
  {
    this.updateSelf();
  }
    }
    updateC=()=>{
        $.ajax({type:'GET',url:"http://localhost:5000/api/com/comment/"+this.props.id,
        async:false,
        success:(res)=>{
            this.setState({comments:res});
            //this.props.updateCN(this.state.name,res.length);
                        }
        });
        this.updateSelf();
    }
    sortDishH=()=>{
        $.ajax({type:'GET',url:"http://localhost:5000/api/com/comment/"+this.props.id,
        async:false,
        success:(res)=>{
            var tmp=res;
            tmp.sort(function(a,b){return b["likeNum"]-a["likeNum"]});
            setTimeout(()=>{
            this.setState({comments:tmp});
        },0);
                        }
        });
        
        
    }
    filterDish=()=>{
        var tmp=this.state.comments;
        tmp=tmp.filter(c=>c['rating']<2);
        setTimeout(()=>{
            this.setState({comments:tmp});
        },0);
    }
    sortDish=(e)=>{
        if(e.target.value==2){
            this.sortDishH();
        }
        else if(e.target.value==3){
            this.updateSelf();
            this.filterDish();
        }
        else{
            this.updateSelf();
        }
    }
    render(){
        return (
        <div>
          <h1>Dish Name:{this.props.id}            Overall:{this.state.rating}------------------------------------------------------------------------------</h1>
          <select className="form-control form-control-sm"        
                    name="subscriptions" onChange={this.sortDish}>
                        {sortChoice.map(item => (
                        <option key={item.uuid} value={item.uuid}>
                        {item.name}
                        </option>
      ))}
                    </select>
          <div>
              {this.state.comments.map(c=><Comment id={c.id} cid={c.customerID} content={c.content} ln={c.likeNum} rating={c.rating} update={this.updateC} did={this.props.did}/>)}
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
        this.state = {value: '',star:0};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        $.ajax({type:'POST',url:"http://localhost:5000/api/com/addC/cid/"+this.props.did+"/dishId/"+this.props.dish+"/content/"+this.state.value+"/"+this.state.star,
        async :false,
        success:(res)=>{ 
            this.props.update();
             //console.log(res.cid);
                        } 
        });
        this.setState({value: "",star:0});
        event.preventDefault();
      }
      
      starChange=(e)=>{
          this.setState({star:e});
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            
            <label>
              write your comment:
              <ReactStars count={5} size={20} onChange={this.starChange} value={this.state.star}/>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            
            <input type="submit" value="submit" />
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
        content:"",
        rating:0
};
 this.likeC=this.likeC.bind(this);
 this.DeleteC=this.DeleteC.bind(this);
}
    componentDidMount(){
        //console.log("adada"+this.props.content);
        this.setState({likeNum:this.props.ln,id:this.props.id,did:this.props.did,cid:this.props.cid,content:this.props.content,rating:this.props.rating});
    }
    componentDidUpdate(prevProps){
        if(!equal(this.props.id, prevProps.id)) 
  {
    this.setState({likeNum:this.props.ln,id:this.props.id,did:this.props.did,cid:this.props.cid,content:this.props.content,rating:this.props.rating});
  }
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
        if(this.state.did==this.state.cid){
            return(
            <div className="container">
                <img src={propic} alt="Avatar" style={{
            resizeMode: "contain",
            height: 30,
            width: 30
            }}/>
                <a>Customer id {this.props.cid}</a>
                <p>rating:{this.props.rating}</p>
                <p>{this.props.content}</p>
                <p></p>
                <div className="rvw-root">
                    <button className="col" onClick={this.likeC}>Helpful</button>
                    <button className="col" onClick={this.DeleteC}>delete</button>
                    <p> {this.state.likeNum} people found this review helpful</p>
                    
                </div>
            </div>
        );
        }
        else{
            return(
                <div className="rvw">
                    <img src={propic} alt="Avatar" style={{
                        resizeMode: "contain",
                        height: 30,
                        width: 30
                    }}/>
                    <a>id {this.props.cid}</a>
                    <p>rating:{this.props.rating}</p>
                    <p>{this.props.content}</p>
                    <p></p>
                    <div className="rvw-root">
                        <button className="col" onClick={this.likeC}>Helpful</button>
                        <p> {this.state.likeNum} people found this review helpful</p>
                    </div>
                </div>
            );
        }
        
    }
}

export default Dish;