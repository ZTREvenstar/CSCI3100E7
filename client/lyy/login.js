function get_userdata(){
    $.ajax({
        url:'http://localhost:3000/login',
        type:'POST',
        dataType:'json',
        success:function(data,stastus){

        },
        error:function(data,Status){
            
        }
    })
}