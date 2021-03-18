// Chen, Haonan 1155124491  JavaScript Document


function get_menu(){
	/*
	$.get("http://localhost:3000/order",
function(txt) {
console.log(txt);
});
	*/
	var result;
	$.ajax({
		url: 'http://localhost:3000/menu',
		type:'GET',
		dataType:'json',
		async:false,
		success: function(data,status){
			console.log("succeed");
			console.log(data);
			result= data;
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
		url: 'http://localhost:3000/order',
		type:'GET',
		dataType:'json',
		async:false,
		success: function(data,status){
			console.log("succeed");
			console.log(data);
			result =  data;
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
 function processform(){
	 	 var form = $("<li><svg><circle></circle></svg><div><h5></h5><h6></h6><p></p><p>TIME:</p><p>BROWSER:</p><p>CITY:</p><p>IP:</p><p>Pixel Depth:</p><button>reply</button></div></li>"); 	 //save;
		 
		 form.addClass("media");
		form.find("svg").attr({"height":100, "width":100});
		 form.find("circle").attr({"cx":50, "cy":50 });
		 var color=$("input[name=inputcolor]:checked").val();
		 form.find("circle").css({"fill":color,"r":"40"});
		 form.find("div").addClass("midia-body");
		 var name=$("#name") .val();		
		 var comment=$("#comment") .val();	
		 var subject=$("#subject") .val();		         
		 form.find("p").eq(0).html(comment); 
		 var time=Gettime;
		 form.find("p").eq(1).append(time);
		 var browser =Getbrowser;
	     form.find("p").eq(2).append(browser);
		 var city =Getcity;
		 {
		 if (city.length==0)
	 city="HongKong";
		 }
	     form.find("p").eq(3).append(city);
		 var ip =Getip;
		 {
	 ip="137.189.247.218";
		 }
	     form.find("p").eq(4).append(ip);
		 form.find("p").eq(5).append(screen.pixelDepth);
		 form.find("h5").html(name);
		 form.find("h6").html(subject);
		 form.find("button").addClass("btn-default text-primary reply");
		 $("div.container").children("ul").append(form);
		 $(this).prev("form").trigger("reset"); 
		 $.ajax({ url: "http://127.0.0.1:8887/test.html", type:'PUT', data:$("body").html(),processData:false});

}
	

 //$(document).ready(writeFile);
 

 // add mene without image information 
 function post_menu(form){
	$.ajax({

		url :'http://localhost:3000/order',
		type:'POST',
		datatype :'JSON',
		data: $(form).serializeArray(),
		success: function(data){
			console.log("mes");
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
			var order = $("<div><div><div ></div><div ><ul><li><p> Name :</p> </li><li><p> Price :</p></li><li><p> Status :</p> </li><li><p> Like :</p> </li></ul></div></div><button></button></div>");
	
			order.find("div").eq(0).addClass("row");
			order.find("div").eq(1).addClass("col-xs-3 col-md-3 col-sm-3");
			order.find("div").eq(2).addClass("col-xs-3 col-md-3 col-sm-3");
			order.find("ul").addClass("list-unstyled");
			order.find("button").addClass("btn-default center-block");
			order.find("button").html("update");
			order.find("p").eq(0).text(dish.find("p").eq(0).text()+menu_list[index]['name']);
			order.find("p").eq(1).text(dish.find("p").eq(1).text()+menu_list[index]['price']);
			order.find("p").eq(2).text(dish.find("p").eq(2).text()+menu_list[index]['status']);
			parent.append(order);
		}
	
	
		}

 $(document).ready(function(){
//bus();
	var menu_list;
	menu_list=get_menu();
	console.log(menu_list);
	//menu_list = [{"name":'AB', "status":'open', "price":31},{"name":'cB', "status":'close', "price":231}];
	add_menu_list($("#menu"), menu_list);


	$("form").submit(function(e){
		post_menu(this);
	  });


 });