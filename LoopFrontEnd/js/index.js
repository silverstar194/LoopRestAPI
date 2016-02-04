
function main(){

	getUserFromDataBase("getuser");
	getPostsFromDataBase("getposts", "location");
	updateLocation();
}

function nearMe(){
	getPostsFromDataBase("getposts", "location", "5");
	document.getElementById("buttonnearme").className = "btntopactive";
	document.getElementById("buttonsoon").className = "btntop";
	document.getElementById("buttonnew").className = "btntop";
}

function endTime(){
	getPostsFromDataBase("getposts", "endtime", "5");
	document.getElementById("buttonnearme").className = "btntop";
	document.getElementById("buttonsoon").className = "btntopactive";
	document.getElementById("buttonnew").className = "btntop";
}

function newPost(){
	getPostsFromDataBase("getposts", "starttime", "5");
	document.getElementById("buttonnearme").className = "btntop";
	document.getElementById("buttonsoon").className = "btntop";
	document.getElementById("buttonnew").className = "btntopactive";
}


function getPostsFromDataBase(endpoint, sortby){

	var myposts = new XMLHttpRequest();
	myposts.open("GET", api+endpoint+"?"+"userID="+myUserID+"&password="+myUserPassword+"&sortby="+sortby+"&max="+max, true);
	myposts.send();
	


	myposts.onreadystatechange = function() {
		if (myposts.readyState == 4 && myposts.status == 200) {
			var postArray = JSON.parse(myposts.response);
			console.log(postArray);

			for(var i=0; i<postArray.length; i++){

				if(document.getElementById('link'+i) != null){
					var myNode = document.getElementById('link'+i);
					while (myNode.firstChild) {
						myNode.removeChild(myNode.firstChild);
					}
				}

				var a = document.createElement('a');
				a.setAttribute('href', 'activity.html?post='+i);
				a.setAttribute('data-ignore', 'push');
				a.id="link"+i;
				document.getElementById("posts").appendChild(a);


				var element = document.createElement("div");
				element.id = "post"+i;
				element.className += "post";
				document.getElementById("link"+i).appendChild(element);

				var posttitle = document.createElement("div");
				posttitle.id = "posttitle"+i;
				posttitle.className += "posttitle";
				document.getElementById("post"+i).appendChild(posttitle);

				title = postArray[i]['title'].split("|").join(" ");


				document.getElementById("posttitle" + i).innerHTML = title;

				var posttext = document.createElement("div");
				posttext.id = "posttext"+i;
				posttext.className += "posttext";
				document.getElementById("post"+i).appendChild(posttext);

				content = postArray[i]['content'].split("|").join(" ");

				if(content.length>45){
					content= content.substring(0,45)+"...";
				}


				document.getElementById("posttext" + i).innerHTML = content;

				var piclink = document.createElement('a');
				piclink.id = "piclink"+i;
				piclink.setAttribute('href', 'otherprofile.html?post='+i);
				piclink.setAttribute('data-ignore', 'push');
				piclink.className += "piclink";
				document.getElementById("post"+i).appendChild(piclink);

				var pic = document.createElement("div");
				pic.id = "pic"+i;
				pic.className += "pic";
				document.getElementById("post"+i).appendChild(pic);


			



				



	//send posts to storage
	window.localStorage.setItem("title"+i, postArray[i]['title']);

	window.localStorage.setItem("content"+i, postArray[i]['content']);

	window.localStorage.setItem("postID"+i, postArray[i]['postID']);

	window.localStorage.setItem("userID"+i, postArray[i]['userID']);

	window.localStorage.setItem("endTime"+i, postArray[i]['endTime'])

	window.localStorage.setItem("time"+i, postArray[i]['time']);

	window.localStorage.setItem("latitude"+i, postArray[i]['latitude']);

	window.localStorage.setItem("longitude"+i, postArray[i]['longitude']);


}


for(var i=0; i<postArray.length; i++){
	var picAPI = new XMLHttpRequest();
	picAPI.open("GET",  api+"getimage?"+"userID="+postArray[i]['userID'], true);
	picAPI.send();
	picAPI.addEventListener("load", imageHandler);
	picAPI.count = i;



	function imageHandler(event) {
			var picObject = JSON.parse(this.response);
			profilePic = picObject.userImageSmall;
			document.getElementById("pic"+this.count).style.backgroundImage = "url("+profilePic+")";
		}
	}


}
}
}

function getUserFromDataBase(endpoint){

	var getUser = new XMLHttpRequest();
	getUser.open("GET", api+endpoint+"?"+"userID="+myUserID+"&password="+myUserPassword, true);
	getUser.send();
	getUser.addEventListener("load", profileHandler);


function profileHandler(event){
	var userArray = JSON.parse(this.response);

	var userArray = JSON.parse(getUser.response);


	window.localStorage.setItem("firstName", userArray['firstName']);

	window.localStorage.setItem("lastName", userArray['lastName']);

	bio = userArray['bio'].split("|").join(" ");

	window.localStorage.setItem("bio", bio);

	window.localStorage.setItem("email", userArray['email']);

	window.localStorage.setItem("userName", userArray['userName']);

	window.localStorage.setItem("userID", userArray['userID']);

	window.localStorage.setItem("postID", userArray['postID']);

	window.localStorage.setItem("messageCount", userArray['messageCount']);

	window.localStorage.setItem("postCount", userArray['postCount']);


}
}

function updateLocation(){

var onSuccess = function(position) {
	var getUser = new XMLHttpRequest();
	getUser.open("GET", api+"updatelocation?"+"userID="+myUserID+"&password="+myUserPassword+"&latitude="+ (Math.round(position.coords.latitude* 10000) / 10000)+"&longitude="+ (Math.round(position.coords.longitude* 10000) / 10000), false);
	getUser.send();
}

  function onError(error) {
        alert('Error Finding Location. Please try again');
    }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

}







