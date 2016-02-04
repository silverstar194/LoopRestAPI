
var max = "15";
var api = "http://www.electrosagellc.com:8080/Loop/api/";
var myUserID = window.localStorage.getItem("myUserID");
var myUserPassword= window.localStorage.getItem("myUserPassword");
var username = window.localStorage.getItem("myUserName");
var latitude=window.localStorage.getItem("latitude");
var longitude=window.localStorage.getItem("longitude");

if(myUserID == null || myUserPassword == null){
	window.location = 'login.html';
}

var joinmessage = "|wants|to|join|you!|Send|them|a|message|back.|";
