import React from "react"
import $ from "jquery"

const URL = "http://localhost:5000"


class OrderCanteen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            myData:[],
        }
    }

    getData(){
        $.ajax({
            url: URL + '/api/order/customer',
            type:'GET',
            dataType:'json',
            success: (data)=> {
                console.log("Success!");
                console.log(data);
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
        }, 3000);

    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }


    render() {
        let display1, display2, display3;
        if(this.state.myData==null || this.state.myData[0]==null){
            display1 = <></>
        }else{
            display1 = <OrderList type="unconfirmed" orderlist = {this.state.myData[0]}/>
        }
        if(this.state.myData==null ||this.state.myData[1]==null){
            display2=<></>
        }else{
            display2=<OrderList type="unfinished" orderlist = {this.state.myData[1]}/>
        }
        if(this.state.myData==null || this.state.myData[2]==null){
            display3=<></>
        }else{
            display3=<OrderList type="finished" orderlist = {this.state.myData[2]}/>
        }

        return (
            <div>
                <h1>Order Canteen Interface</h1>
                <h3>Newly Come Orders:</h3>
                <div>choose an order to confirm</div>
                {display1}

                <h3>Waiting Orders: Waiting</h3>
                <div>choose an order to finish</div>
                {display2}

                <h3>Finished Orders:</h3>
                <div>Once finished, send remind automatically，then can send remind manually</div>
                {display3}
            </div>
        );
    };
}


class OrderList extends React.Component {



    render() {
        let unconfirmed = [
            {"order": 1, "name": "a"},
            {"order": 1, "name": "a"},
            {"order": 1, "name": "a"}];
        return (
            <div>

                <ul className = "list-unstyled" >
                    {
                        unconfirmed.map(function(item) {
                            return(
                                <li className="order" id = {"order"+ item["order"]}>
                                    {item["order"]}
                                    <div>Dish Name:{item["name"]}</div>
                                    <button className="btn" id= {"btn" + item["order"]}>confirm</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr/>
            </div>
        );
    }
}

export default OrderCanteen;