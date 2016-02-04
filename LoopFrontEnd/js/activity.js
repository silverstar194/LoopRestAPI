function main () {
var postNum = $_GET('post');

document.getElementById("posttitleinner").innerHTML = window.localStorage.getItem("title"+postNum).split("|").join(" ");

document.getElementById("posttextinner").innerHTML = window.localStorage.getItem("content"+postNum).split("|").join(" ");
document.getElementById("piclink").setAttribute('href', 'otherprofile.html?post='+postNum);
document.getElementById("piclink").setAttribute('data-ignore', 'push');

var pic = new XMLHttpRequest();
pic.open("GET",  api+"getimage?"+"userID="+window.localStorage.getItem("userID"+postNum), true);
pic.send();
pic.addEventListener("load", imageHandler);


function imageHandler(event) {
var picObject = JSON.parse(this.response);
profilePic = picObject.userImageSmall;
var pic = "url("+profilePic+")";


document.getElementById("picinner").style.backgroundImage = pic;
document.getElementById("pictextactivity").innerHTML = picObject.firstName;
}
initMap(parseFloat(window.localStorage.getItem("latitude"+postNum)), parseFloat(window.localStorage.getItem("longitude"+postNum)));

 distanceFill();
}

function join(){

var getPost = new XMLHttpRequest();
getPost.open("GET", api+"getuser?userID="+myUserID, true); 
getPost.send();
getPost.addEventListener("load", messageHandler);

function messageHandler(message){
var postArray = JSON.parse(this.response);


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
}


function initMap(latitude, longitude) {

 var postLatLng = {lat: latitude, lng: longitude};
  var myLatLng = {lat: parseFloat(window.localStorage.getItem("latitude")), 
  lng: parseFloat(window.localStorage.getItem("longitude"))};

 var myLocation = {
    path: 'M304,48c0,26.5-21.5,48-48,48s-48-21.5-48-48s21.5-48,48-48S304,21.5,304,48z M288,128h-64c-17.688,0-32,14.313-32,32v128h32v128h64V288h32V160C320,142.313,305.688,128,288,128z M320,323.406v32.313c74.531,8.813,128,32.438,128,60.281c0,35.344-85.969,64-192,64S64,451.344,64,416c0-27.844,53.5-51.469,128-60.281v-32.313c-86.813,9.5-160,39.125-160,92.594c0,66.313,112.5,96,224,96s224-29.688,224-96C480,362.531,406.813,332.906,320,323.406z',
    fillColor: '#00b78b',
    fillOpacity: 1,
    scale: .08,
  };

 var activity = {
    path: 'M416,448c0,55.688-100.25,64-160,64s-160-8.313-160-64c0-41.563,55.891-56.75,109.078-61.75l9.047,31.656 C164.109,422.25,128,434,128,448c0,17.688,57.313,32,128,32c70.719,0,128-14.313,128-32c0-14-36.094-25.75-86.125-30.094 l9.063-31.656C360.125,391.25,416,406.438,416,448z M314.438,243.438L256,448l-59.922-209.719C157.938,216.125,132,175.281,132,128 C132,57.313,189.313,0,260,0s128,57.313,128,128C388,179.125,357.813,222.938,314.438,243.438z M320,128c0-35.344-28.656-64-64-64 s-64,28.656-64,64s28.656,64,64,64S320,163.344,320,128z',
    fillColor: '#00b78b',
    fillOpacity: 1,
    scale: .08,
  };
 

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('postmap'), {
    center: postLatLng,
    scrollwheel: false,
    zoom: 12
  });

  var infowindowpost = new google.maps.InfoWindow({
    content: "Activity"
  });


var postMarker = new google.maps.Marker({
    position: postLatLng,
    map: map,
    icon:activity
  });



  var infowindow = new google.maps.InfoWindow({
    content: "Current Location"
  });

var myMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: myLocation
  });



myMarker.addListener('click', function() {
    infowindow.open(map, myMarker);
  });

postMarker.addListener('click', function() {
    infowindowpost.open(map, postMarker);
  });

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


function distanceFill() {
	var lat1 = parseFloat(window.localStorage.getItem("latitude"));
	var lon1 = parseFloat(window.localStorage.getItem("longitude"));
	var lat2 = window.localStorage.getItem("latitude"+$_GET("post"));
	var lon2 =  window.localStorage.getItem("longitude"+$_GET("post"));
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	
	if(dist<=.5){
document.getElementById("distancetext").innerHTML = "Distance from you: > 1/2 mile away";
return;
}

if(dist>=25){
	document.getElementById("distancetext").innerHTML = "Distance from you: < 25 miles away";
	return;
}


document.getElementById("distancetext").innerHTML = "Distance from you: "+Math.floor(dist*10)/10+" miles";

}

function spam(){
if (confirm('Are you sure?')) {

	var spam= new XMLHttpRequest();
	spam.open("GET", api+"reportspam?"+"postID="+window.localStorage.getItem("postID"+$_GET('post')), true);
	spam.send();
	
    alert("Thanks!");
}

}