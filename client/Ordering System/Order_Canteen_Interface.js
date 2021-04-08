// Zhang Tingrong

// get orders and their status from the server
function update_order_info(){
    var result;
    $.ajax({
        url: 'http://localhost:3000/order',
        type:'GET',
        dataType:'json',

        success: function(data,status){
            console.log("succeed");
            console.log(data);
            result =  data;
            add_menu_list($("#order"), data);

        },
        error:function(data,status){
            console.log("error");
            console.log(data);
        }


    });
    return result;
}

// display orders in the interface according to their status:
// coming, preparing, finished
function display_orders(){

}

// add orders into list one by one, which will be called by function display_orders
function add_order_list(parent, order_list) {
    for (index in order_list) {
        console.log(order_list[index]);
        var order = $("<div><div class = 'row'><ul class='list-unstyled' ><li><p> DishName :</p> </li><li><p> Charge :</p></li><li><p> Time :</p></li><li><p> Status :</p></li></ul></div><button class= 'btn-default center-block'>cancel</button></div>");

        order.find("div").eq(0).addClass("row");
        order.find("div").eq(1).addClass("col-xs-3 col-md-3 col-sm-3");
        order.find("div").eq(2).addClass("col-xs-3 col-md-3 col-sm-3");
        order.find("ul").addClass("list-unstyled");
        order.find("button").addClass("btn-default center-block");
        order.find("button").html("update");
        order.find("p").eq(0).text(dish.find("p").eq(0).text() + menu_list[index]['name']);
        order.find("p").eq(1).text(dish.find("p").eq(1).text() + menu_list[index]['price']);
        order.find("p").eq(2).text(dish.find("p").eq(2).text() + menu_list[index]['status']);

        order.find("p").eq(0).text(order.find("p").eq(0).text() + order_list[index]['name']);
        order.find("p").eq(1).text(order.find("p").eq(1).text() + order_list[index]['charge']);
        order.find("p").eq(2).text(order.find("p").eq(3).text() + order_list[index]['status']);
        parent.append(order);
    }
}

// send reminding message to customers whose orders are finished
function send_reminding_message(){

}
