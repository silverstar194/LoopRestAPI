function main () {
var postNum = $_GET('post');

document.getElementById("myposttitle").value = window.localStorage.getItem("mytitle"+postNum).split("|").join(" ");

document.getElementById("myposttext").innerHTML = window.localStorage.getItem("mycontent"+postNum).split("|").join(" ");

}

function postEditToDataBase(){
	var postNum = $_GET('post');

	var myTitle = document.getElementById("myposttitle").value;
	var myContent = document.getElementById("myposttext").innerHTML;

	  if(!validateTitle(myTitle)){
      return;
    }


    if(!validateContent(myContent)){
      return;
    }


	var time = document.getElementById("timeForm").value;
    var endTime;
    var timeNow = new Date().getTime();

    switch (time) {
        case "0":
            endTime = timeNow+(60*60);
            break;

        case "1":
           endTime = (timeNow + (60 * 60*2));
            break;

        case "5":
           endTime = (timeNow + (60 * 60 * 7));
            break;

        case "10":
            endTime = (timeNow + (60 * 60 * 10));
            break;

        default:
           endTime = "error";
    }

	var myPostID = window.localStorage.getItem("mypostID"+postNum);

	var myLatitude = window.localStorage.getItem("mylatitude"+postNum);

	var myLongitude = window.localStorage.getItem("mylongitude"+postNum);



	var nameArray = name.split(" ");
 	

	myTitle = myTitle.replace(/\s/g, "|");
	myContent = myContent.replace(/\s/g, "|");



	var posts = new XMLHttpRequest();
    posts.open("GET",  api+"updatepost?"+"postID="+myPostID+"&title="+myTitle+"&content="+myContent+"&latitude="+myLatitude+"&longitude="+myLongitude+"&userID="+myUserID+"&password="+myUserPassword+"&endTime="+endTime, false);
    posts.send();
    posts.addEventListener("load", postHandler);

function postHandler(event) {
  var postArray = JSON.parse(this.response);

  if("Error" in  postArray){
    alert("We have detected spam and your account has been suspended.");
    return;
  }

window.localStorage.setItem("title"+postNum, myposttitle);
window.localStorage.setItem("content"+postNum, myposttext);

window.location = "index.html";

}
}

function validateContent(x) {
  if (x == null || x == "") {
        alert("Please enter a description");
        return false;
       
    }else if (75 > x.length){
        alert("Description must be at least 75 characters");
        return false;
    }else if(250 < x.length){
        alert("Description cannot be more then 250 characters");
        return false;
    }

    return true;
}

function validateTitle(x) {
    if (x == null || x == "") {
        alert("Please enter a title");
        return false;
       
    }else if (10 > x.length){
        alert("Title must be at least 10 characters");
        return false;
    }else if(40 < x.length){
        alert("Title cannot be more then 40 characters");
        return false;
    }
      return true;
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