var profileInfo;
var profilePic;

function handleChangeProfileInfo() {
    $("#changePassword").get(0).reset(); 
    $("#changeProfilePic").get(0).reset(); 
    $("#changeProfileInfo").toggle();
    $("#changePassword").hide();
    $("#changeProfilePic").hide();
}

function handleChangePassword() {
    $("#changeProfileInfo").get(0).reset(); 
    $("#changeProfilePic").get(0).reset(); 
    $("#changeProfileInfo").hide();
    $("#changePassword").toggle();
    $("#changeProfilePic").hide();
}

function handleChangeProfilePic(){
    $("#changePassword").get(0).reset(); 
    $("#changeProfileInfo").get(0).reset(); 
    $("#changePassword").hide();
    $("#changeProfileInfo").hide();
    $("#changeProfilePic").toggle();
}


function getProfileInfo(){
	var result;
	$.ajax({
		url: 'http://localhost:3000/profileInfo',
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

function getProfilePic(){
	var result;
	$.ajax({
		url: 'http://localhost:3000/profilePic',
		type:'GET',
		dataType:'text',
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
	console.log(result);
	return result;
}

function postProfileInfo(form){
    
	$.ajax({
		url :'http://localhost:3000/updateProfileInfo',
		type:'POST',
		datatype :'JSON',
		data: form.serializeArray(),
		success: function(data){
			console.log("mes");
            console.log(data);
            result=data;
		},
		error: function(err){
			console.log("err");
		}
	})
    updateProfileInfo(result);
}

/*function postProfilePic(profilePic){
    var pics = profilePic.pops('files');

    var data = new FormData();
    data.append('profilePic',pics[0]);

    $.ajax({
        url:'http://localhost:3000/updateProfilePic',
        type:'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    })
}*/

function updateProfileInfo(profileInfo){
    $('#id').text(profileInfo.id);
    $('#profileName').text(profileInfo.profileName);
    $('#email').text(profileInfo.email);
}

function updateProfilePic(profilePic){
    $('#profilePic').prop({"src":profilePic});
}

$(document).ready(function(){
    $("#changeProfileInfo").toggle();
    $("#changePassword").toggle(); 
    $("#changeProfilePic").toggle(); 
    profileInfo = getProfileInfo(); 
    profilePic = getProfilePic();
	console.log(profilePic);
    updateProfileInfo(profileInfo);
    updateProfilePic(profilePic);
    $('#changeProfileInfo').submit((e)=>postProfileInfo( $('#changeProfileInfo')));
    //$('#changeProfilePic').submit((e)=>postProfilePic($('#chooseProfilePic')));

});