
function fillProfile(){

	var getUser = new XMLHttpRequest();
	getUser.open("GET", api+"getuser?"+"userID="+myUserID+"&password="+myUserPassword, true);
	getUser.send();
	console.log(api+"getuser?"+"userID="+myUserID+"&password="+myUserPassword);
	getUser.addEventListener("load", profileHandler);

	function profileHandler(event){
	var userArray = JSON.parse(this.response);

document.getElementById("bioname").innerHTML = userArray['firstName']+" "+ userArray['lastName'];
document.getElementById("biocontent").innerHTML = userArray['bio'].split("|").join(" ");
document.getElementById("messageCount").innerHTML =   userArray['messageCount'];
document.getElementById("postCount").innerHTML =  userArray['postCount'];
}







var pic = new XMLHttpRequest();
pic.open("GET",  api+"getimage?"+"userID="+myUserID, true);
pic.send();
pic.addEventListener("load", imageHandler);


function imageHandler(event) {
var picObject = JSON.parse(this.response);
profilePic = picObject.userImageLarge;
var pic = "url("+profilePic+")";
document.getElementById("profilepic").style.backgroundImage = pic;

	}



}





