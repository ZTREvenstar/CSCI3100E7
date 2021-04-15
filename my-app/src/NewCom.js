import React from "react";
import $ from "jquery";
import propic from './pic/green.png';
import equal from 'fast-deep-equal';
import ReactStars from "react-rating-stars-component";
const URL = "http://localhost:80";

const sortChoice=[
    {uuid:'1',name:'Choose filter'},
    {uuid:'2',name:'Number of Helpful'},
    {uuid:'3',name:'Bad comments only'}
];
class DishDet extends React.Component{
    constructor(props){
        super(props);
        this.state={
        name:"",
        id:"",
        did:"",
        comments:[],
        rating:0.0 ,      //overall rating
        show:0
};
this.updateSelf=this.updateSelf.bind(this);
this.updateC=this.updateC.bind(this);
this.sortDishH=this.sortDishH.bind(this);
this.filterDish=this.filterDish.bind(this);
this.sortDish=this.sortDish.bind(this);
}
    updateSelf=()=>{
        this.setState({id:this.props.id,did:this.props.did,name:this.props.name,show:this.props.show});
        console.log("gggggggg"+this.props.show);
        $.ajax({type:'GET',url:URL + "/api/com/comment/"+this.props.id,
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
    componentWillReceiveProps(nextProps) {
        this.setState({id:this.props.id,
            did:nextProps.did,
            name:nextProps.name,
            show:nextProps.show});
            $.ajax({type:'GET',url:URL + "/api/com/comment/"+this.props.id,
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
    updateC=()=>{
        $.ajax({type:'GET',url:URL + "/api/com/comment/"+this.props.id,
        async:false,
        success:(res)=>{
            this.setState({comments:res});
            //this.props.updateCN(this.state.name,res.length);
                        }
        });
        this.updateSelf();
    }
    sortDishH=()=>{
        $.ajax({type:'GET',url:URL + "/api/com/comment/"+this.props.id,
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
        if(this.state.show==0){
            return (<div></div>)
        }
        else{
           return (
        <div>
          <h2>Dish Name:{this.props.name}</h2>            
          <h2>Total Rating:{this.state.rating}</h2>
          <select className="form-control form-control-sm"        
                    name="subscriptions" onChange={this.sortDish}>
                        {sortChoice.map(item => (
                        <option key={item.uuid} value={item.uuid}>
                        {item.name}
                        </option>
      ))}
                    </select>
          <div className = "d-flex flex-wrap justify-content-center">
              {this.state.comments.map(c=><Comment id={c.id} cid={c.customerID} content={c.content} ln={c.likeNum} rating={c.rating} update={this.updateC} did={this.props.did}/>)}
          </div>
          <div>
              <CForm update={this.updateC} did={this.props.did} dish={this.state.id}/>
          </div>
         </div> 
      );  
        }
        
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
        $.ajax({type:'POST',url:URL + "/api/com/addC/cid/"+this.props.did+"/dishId/"+this.props.dish+"/content/"+this.state.value+"/"+this.state.star,
        async :false,
        success:(res)=>{ 
            this.props.update();
             //console.log(res.cid);
                        } 
        });
        this.setState({value: ""});
        event.preventDefault();
      }
      
      starChange=(e)=>{
          this.setState({star:e});
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
            <label>
              write your comment:
              <ReactStars count={5} size={20} onChange={this.starChange} value={this.state.star}/>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            </div>
            <button type="submit" class="btn btn-primary"value="submit">Submit</button>
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
        $.ajax({type:'POST',url:URL + "/api/com/like/"+this.props.id, async:false,
        success:(res)=>{
            var num=res[0].LN;
            this.setState({likeNum:num});
        }
        })
    }
    DeleteC=()=>{
        $.ajax({type:'POST',url:URL + "/api/com/deleteC/"+this.props.id+"/"+this.props.did, async: false,
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
            <>
            <div className="py-3 px-2">
                <div className="card d-inline-block my-2" style={{width: 220}}>
                        <img src={URL+"/public/customer/"+this.state.cid+".png"} className="card-img" alt="..."  ></img>
                        <div className="card-body">
                            <h6 className="card-title">rating:{this.props.rating}</h6>
                            <p className="card-text">{this.props.content}</p>
                            <div className="d-flex flex-wrap justify-content-center">
                            <button type="button" className="btn btn-primary m-1" onClick={this.likeC}>Helpful</button>
                            <button type="button" className="btn btn-primary m-1" onClick={this.DeleteC}>delete</button>
                            <small class="text-muted"> {this.state.likeNum} people found this review helpful</small>
                    </div>
                        </div>
                   </div>
            </div>     
            </>
        );
        }
        else{
            return(
                <>
                <div className="py-3 px-2">
                    <div className="card d-inline-block my-2" style={{width: 220}}>
                            <img src={URL+"/public/customer/"+this.state.cid+".png"} className="card-img" alt="..."  ></img>
                            <div className="card-body">
                                <h6 className="card-title">rating:{this.props.rating}</h6>
                                <p className="card-text">{this.props.content}</p>
                                <div className="d-flex flex-wrap justify-content-center">
                                <button type="button" className="btn btn-primary m-1" onClick={this.likeC}>Helpful</button>
                                <small class="text-muted"> {this.state.likeNum} people found this review helpful</small>
                        </div>
                            </div>
                       </div>
                </div>     
                </>
            );
        }
        
    }
}

export default DishDet;
