import React from "react"
import $ from "jquery"

const URL = "http://localhost:5000"


class OrderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            myData:[],
        }
    }

    getData(){
        $.ajax({
            url: URL + '/api/order/customer?customerID=' + this.props.id,
            type:'GET',
            dataType:'json',
            success: (data)=> {
               // console.log("!!!!!Success!");
                //console.log(data);
                this.setState({myData:data});
            },
            error: (err)=>{
                console.log("error");
                console.log(err);
            }
        })
    }
    componentDidMount(){
        this.getData();
        //console.log("Menu canteenID is"+this.props.canteenID)
        this.intervalId = setInterval(() => {
            this.getData();
        }, 500);

    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }


    render() {
        if(this.props.PageToShow!=1){
            return(<></>)
        }
        let display1, display2, display3;
        if(this.state.myData==null || this.state.myData[0]==null){
            display1 = <div>You have no orders unconfirmed.</div>
        }else{
            display1 = <OrderList orderlist = {this.state.myData[0]}/>
        }
        if(this.state.myData==null ||this.state.myData[1]==null){
            display2=<div>You have no orders unfinished.</div>
        }else{
            display2=<OrderList orderlist = {this.state.myData[1]}/>
        }
        if(this.state.myData==null || this.state.myData[2]==null){
            display3=<div></div>
        }else{
            display3=<OrderList orderlist = {this.state.myData[2]}/>
        }

        return (
            <div>
                <h1>Order Customer Interface</h1>
                <h3>My order status:</h3>

                <div>Waiting to be confirmed:</div>
                {display1}

                <h3>Preparing:</h3>
                {display2}

                <h3>Finished Orders. Please take the meal:</h3>
                {display3}

                <h3>HAVE A NICE MEAL!</h3>
            </div>
        );
    };
}

class OrderList extends React.Component {

    render() {

        return (
            <div>
                <div className="card-columns">
                    {
                        this.props.orderlist.map((item)=>{
                            return(
                                
                                    <div key={"order"+ item["orderID"]} id = {"order"+ item["orderID"]} className="card d-inline-block m-1">
                                        <h5 className="card-header">OrderID: {item["orderID"]}</h5>
                                        <div className="card-body">
                                            <h5 className="card-title">Dish Name: {item["dishName"]}</h5>
                                            <h6 className="card-title">Canteen: {item["canteenName"]}</h6>
                                            <h6 className="card-title">Price: ${item["price"]}</h6>  
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

export default OrderCustomer;