// Chen, Haonan 1155124491  JavaScript Document


function get_menu(){

	//we could delete result variable, but just keep it for debugging
	var result;
	console.log("here");
	$.ajax({
		url: 'http://localhost:5000/api/canteen/dish',
		type:'GET',
		dataType:'json',
		//async:false,
		success: function(data,status){
			console.log("succeed");
			console.log(data);
			result= data;
			add_menu_list($("#menu"), data);
		},
		error:function(data,status){
			console.log("error");
			console.log(data);
		}


	});
	return result;
}



function get_order(){
	var result;
	$.ajax({
		url: 'http://localhost:5000/api/canteen/order',
		type:'GET',
		dataType:'json',

		success: function(data,status){
			console.log("succeed");
			console.log(data);
			result =  data;
			add_order_list($("#order"), data);

		},
		error:function(data,status){
			console.log("error");
			console.log(data);
		}


	});
	return result;
}



function Gettime()
{
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
     var h = myDate.getHours();//获取当前小时数(0-23)
     var m = myDate.getMinutes();//获取当前分钟数(0-59)
     var s = myDate.getSeconds();//获取当前秒
    return (year + "/" + mon + "/" + date + " " + h + ":" + m + ":" + s);

}
 

 // add menu without image information 
 function post_menu(form){
	$.ajax({

		url :'http://localhost:5000/api/canteen/dish',
		type:'POST',
		datatype :'JSON',
		data: $(form).serializeArray(),
		success: function(data){
			console.log("add menu");
		},
		error: function(err){
			console.log("err");
		}
	})
 }
 function put_menu(form){
	$.ajax({

		url :'http://localhost:5000/api/canteen/dish',
		type:'PUT',
		datatype :'JSON',
		data: $(form).serializeArray(),
		success: function(data){
			console.log("update menu");
		},
		error: function(err){
			console.log("err");
		}
	})
 }

 function put_order(form){
	$.ajax({

		url :'http://localhost:5000/api/canteen/order',
		type:'PUT',
		datatype :'JSON',
		data: $(form).serializeArray(),
		success: function(data){
			console.log("update order");
		},
		error: function(err){
			console.log("err");
		}
	})
 }

 function add_menu_list(parent, menu_list){	 
	for (index in menu_list){
		console.log(menu_list[index]);
		var dish = $("<div><div><div ><img ></div><div ><ul><li><p> Name :</p> </li><li><p> Price :</p></li><li><p> Status :</p> </li>	 <li><p> Like :</p> </li></ul></div></div><button></button></div>");

		dish.find("div").eq(0).addClass("row");
		dish.find("div").eq(1).addClass("col-xs-3 col-md-3 col-sm-3");
		dish.find("div").eq(2).addClass("col-xs-3 col-md-3 col-sm-3");
		dish.find("img").addClass("img-responsive");
		dish.find("ul").addClass("list-unstyled");
		dish.find("button").addClass("btn-default center-block");
		dish.find("button").html("update");
		dish.find("p").eq(0).text(dish.find("p").eq(0).text()+menu_list[index]['name']);
		dish.find("p").eq(1).text(dish.find("p").eq(1).text()+menu_list[index]['price']);
		dish.find("p").eq(2).text(dish.find("p").eq(2).text()+menu_list[index]['status']);
		parent.append(dish);
	}


	}

	function add_order_list(parent, order_list){	 
		for (index in order_list){
			console.log(order_list[index]);
			var order = $("<div><div class = 'row'><ul class='list-unstyled' ><li><p> ID :</p> </li><li><p> Charge :</p></li><li><p> Time :</p></li><li><p> Status :</p></li></ul></div><button class= 'btn-default center-block'>cancel</button></div>");
	/*
			order.find("div").eq(0).addClass("row");
			order.find("div").eq(1).addClass("col-xs-3 col-md-3 col-sm-3");
			order.find("div").eq(2).addClass("col-xs-3 col-md-3 col-sm-3");
			order.find("ul").addClass("list-unstyled");
			order.find("button").addClass("btn-default center-block");
			order.find("button").html("update");
			order.find("p").eq(0).text(dish.find("p").eq(0).text()+menu_list[index]['name']);
			order.find("p").eq(1).text(dish.find("p").eq(1).text()+menu_list[index]['price']);
			order.find("p").eq(2).text(dish.find("p").eq(2).text()+menu_list[index]['status']);
			*/
			order.find("p").eq(0).text(order.find("p").eq(0).text()+order_list[index]['id']);
			order.find("p").eq(1).text(order.find("p").eq(1).text()+order_list[index]['charge']);
			order.find("p").eq(2).text(order.find("p").eq(3).text()+order_list[index]['status']);
			parent.append(order);
		}
	
	
		}

function delete_order(order_id){
			$.ajax({
		
				url :'http://localhost:5000/api/canteen/order/?id='+'order_id',
				type:'DELETE',
				//datatype :'JSON',
				//data:{"ID": order_id},
				success: function(data){
					console.log("mes");
				},
				error: function(err){
					console.log("err");
				}
			})
		 }

function delete_menu(dish_id){
			$.ajax({
		
				url :'http://localhost:5000/api/canteen/dish/id='+'dish_id',
				type:'DELETE',
				//datatype :'JSON',
				//data:{"ID": order_id},
				success: function(data){
					console.log("mes");
				},
				error: function(err){
					console.log("err");
				}
			})
		 }


 $(document).ready(function(){
//bus();
	//menu_list,order_list only for test, actually unneccessary
	var menu_list;
	//var order_list=[{"name":'AB', "status":'open', "charge":31},{"name":'cB', "status":'close', "charge":231}];
	menu_list=get_menu();
	console.log(menu_list);
	var order_list=get_order();
	add_order_list($("#order"), order_list)

	$("form").submit(function(e){
		put_order(this);
	  });


 });
