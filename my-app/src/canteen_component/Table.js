import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000"

class TableRow extends React.Component{
    
    delete_menu=()=>{

        $.ajax({
    
            url :URL+'/api/canteen/dish?id='+this.props.data.id,
            type:'delete',
            datatype :'JSON',
            data: {},
            success: (data)=>{
                alert("delete successfully");
            },
            error: (err)=>{
                console.log("err");
            }
        })
    }
    render(){

        return (
            <tr key = {this.props.data.id}>   
            <td scope="row"> <a className="btn btn-warning" onClick={this.delete_menu}>delete</a></td>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.status==1?"Offered":"Not Offered"}</td>   
            <td>{this.props.data.price}</td>  
            <td>{this.props.data.canteenID}</td>  
           </tr>
        )
    }
}

export default class Table extends React.Component{

    filter_data=()=>{
        if (this.props.search_content==null)
        return this.props.Menu_data;

        return this.props.Menu_data.filter((data)=>{
        if (data["name"].toLowerCase().includes(this.props.search_content.toLowerCase()))
            return true;
            return false;
});
    }

    render(){

        return(
            <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  ID
                </th>
                <th>
                  Name
                </th>
                <th>
                  Status
                </th>
                <th>
                  Price
                </th>
                <th>
                  CanteenID
                </th>
              </tr>
            </thead>
            <tbody>
        { this.filter_data().map(data => 
            <TableRow data={data}/> )}
            </tbody>
          </table>
        )
    }
}