import React from "react"
import $ from "jquery"

const URL = "http://54.227.0.209:5000"


class OrderCanteen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            myData:[],
        }
    }

    getData(){
        if(this.serverRequest!=null && this.serverRequest.readyState!=4){
            console.log("last update not finished");
            return;
        }
        this.serverRequest = $.ajax({
            url: URL + '/api/order/canteen?canteenID='+ this.props.id,
            type:'GET',
            dataType:'json',
            success: (data)=> {
               // console.log("Success!");
                console.log(data);
                this.setState({myData:data});
            },
            error: (err)=>{
                console.log("error");
                //console.log(err);
            }
        })
    }
    componentDidMount(){
        this.getData();
        //console.log("Menu canteenID is"+this.props.canteenID)
        this.intervalId = setInterval(() => {
            this.getData();
        }, 3000);

    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
        if(this.serverRequest!=null){
            this.serverRequest.abort();
        }
    }


    render() {
        if (this.props.PageToShow!=1)
        return null;

        let display1, display2, display3;
        if(this.state.myData==null || this.state.myData[0]==null){
            display1 = <></>
        }else{
            display1 = <OrderList operation={1} btn_operation="confirm" orderlist = {this.state.myData[0]}/>
        }
        if(this.state.myData==null ||this.state.myData[1]==null){
            display2=<></>
        }else{
            display2=<OrderList operation={1} btn_operation="finish" orderlist = {this.state.myData[1]}/>
        }
        if(this.state.myData==null || this.state.myData[2]==null){
            display3=<></>
        }else{
            display3=<OrderList operation={2} btn_operation="discard" orderlist = {this.state.myData[2]}/>
        }

        return (
            <ul  className=" list-group">
                <li className=" list-group-item">
                <h1>Order Canteen Interface</h1>
                <h3>Incoming Orders:</h3>
                <div>choose an order to confirm</div>
                {display1}
                </li>
                <li className=" list-group-item">
                <h3>Waiting Orders:</h3>
                <div>choose an order to finish</div>
                {display2}
                </li>
                <li className=" list-group-item">
                <h3>Finished Orders:</h3>
                <div>Once finished, send remind automatically，then can send remind manually</div>
                {display3}
                </li>
            </ul>
        );
    };
}


class OrderList extends React.Component {

    handleClickEvent = (orderID, operation)=>{

        $.ajax({
            type: "POST",
            url: URL + "/api/order/updateorder",
            // operation = 1 for update, = 2 for delete
            data: {
                "orderID" : orderID,
                "operation" : operation
            },
            dataType: "json",
            complete: function(){
                alert("completed!");
            }
        });
    }


    render() {

        return (
            <div>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        this.props.orderlist.map((item)=>{
                            return(
                                
                                    <div key={"order"+ item["orderID"]} id = {"order"+ item["orderID"]} className="card m-1 d-inline-block">
                                        <h5 className="card-header">OrderID: {item["orderID"]}</h5>
                                        <div className="card-body">
                                            <h5 className="card-title">Dish Name: {item["dishName"]}</h5>
                                            <button className="btn btn-primary" id= {"btn" + item["orderID"]}
                                            onClick={(e)=>this.handleClickEvent(item["orderID"], this.props.operation)}>{this.props.btn_operation}</button>
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>
                <hr/>
            </div>
        );
    }
}

export default OrderCanteen;