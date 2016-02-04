function main(){
var getUser = new XMLHttpRequest();
getUser.open("GET", api+"getuser?userID="+window.localStorage.getItem("userID"+$_GET("post")), false); 
getUser.send();
console.log(api+"get?userID="+window.localStorage.getItem("userID"+$_GET("post")));
var userArray = JSON.parse(getUser.response);
console.log(userArray);

document.getElementById("otherbioname").innerHTML = userArray['firstName']+" "+ userArray['lastName'];
document.getElementById("joinbutton").innerHTML = "Join "+userArray['firstName']+"!";
document.getElementById("otherbiocontent").innerHTML = userArray['bio'].split("|").join(" ");
document.getElementById("otherback").setAttribute('href', 'activity.html?post='+$_GET("post"));
document.getElementById("otherback").setAttribute('data-ignore', 'push');



var pic = new XMLHttpRequest();
pic.open("GET",  api+"getimage?"+"userID="+window.localStorage.getItem("userID"+$_GET("post")), true);
pic.send();
pic.addEventListener("load", imageHandler);


function imageHandler(event) {
var picObject = JSON.parse(this.response);
profilePic = picObject.userImageLarge;
var pic = "url("+profilePic+")";
document.getElementById("otherprofilepic").style.backgroundImage = pic;

}
}

function join(){

var getPost = new XMLHttpRequest();
getPost.open("GET", api+"getuser?userID="+window.localStorage.getItem("userID"+$_GET("post")), false); 
getPost.send();
console.log(api+"get?userID="+window.localStorage.getItem("userID"+$_GET("post")));
var postArray = JSON.parse(getPost.response);


postIdText = (postArray['firstName'] +" "+postArray['lastName']).replace(/\s/g, "|");;



var sendmessage = new XMLHttpRequest();
sendmessage.open("GET", api+"newmessage?"+"userID="+myUserID+"&password="+myUserPassword+"&postID="+window.localStorage.getItem("postID"+$_GET("post"))+"&content="+postIdText+joinmessage+"&toID="+window.localStorage.getItem("userID"+$_GET("post")), true);
sendmessage.send();
sendmessage.onreadystatechange = function() {
	

	if (sendmessage.readyState == 4 && sendmessage.status == 200) {
		var messageArray = JSON.parse(sendmessage.response)
		window.location = "./messages.html";

	}

}
}




function $_GET(param) {
	var vars = {};
	window.location.href.replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}