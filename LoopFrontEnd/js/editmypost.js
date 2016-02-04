function main() {
var postNum = $_GET('post');

document.getElementById("posttitleinner").innerHTML = window.localStorage.getItem("mytitle"+postNum).split("|").join(" ");

document.getElementById("posttextinner").innerHTML = window.localStorage.getItem("mycontent"+postNum).split("|").join(" ");

var pic = new XMLHttpRequest();
pic.open("GET",  api+"getimage?"+"userID="+myUserID, true);
pic.send();
pic.addEventListener("load", imageHandler);


function imageHandler(event) {
var picObject = JSON.parse(this.response);
profilePic = picObject.userImageSmall;
var pic = "url("+profilePic+")";


document.getElementById("picinner").style.backgroundImage = pic;
document.getElementById("pictextactivity").innerHTML = picObject.firstName;
}


initMap(parseFloat(window.localStorage.getItem("mylatitude"+postNum)), parseFloat(window.localStorage.getItem("mylongitude"+postNum)));

}

function initMap(latitude, longitude) {

 var myLatLng = {lat: latitude, lng: longitude};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('postmap'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 12
  });



  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
      });
}

function editPost(){
	var postNum = $_GET('post');
	window.location="./myposteditpage.html?post="+postNum;

}

function deletePost(){
var r = confirm("Are you sure?");

if (r == true) {
var postNum = $_GET('post');
var myPostID = window.localStorage.getItem("mypostID"+postNum);

var deletePost = new XMLHttpRequest();
  deletePost.open("GET",  api+"deletepost?"+"postID="+myPostID+"&userID="+myUserID+"&password="+myUserPassword, false);
  deletePost.send();


} else {
   return;
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