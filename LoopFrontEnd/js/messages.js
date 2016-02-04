	function main(){
		getUserMessagesFromDataBase("getmessage");
		getMessageCount();
	}

	function getUserMessagesFromDataBase(endpoint){

		var myMessages = new XMLHttpRequest();
		myMessages.open("GET", api+endpoint+"?"+"userID="+myUserID+"&password="+myUserPassword, true);
		myMessages.send();
		

		myMessages.onreadystatechange = function() {
			if (myMessages.readyState == 4 && myMessages.status == 200) {
				var messageArray = JSON.parse(myMessages.response);
				
				if("Message" in messageArray){
	document.getElementById("nomessages").innerHTML = "Look's like you don't have any messages..."
}

				for(var i=messageArray.length-1; i>=0; i--){

	//if message string for postID is alreay there do nothing
	if(document.getElementById("link"+messageArray[i]['postID']) != null){
		
	} else {
		
		var a = document.createElement('a');
		a.setAttribute('href', 'messagesfeed.html?fromID='+messageArray[i]['fromID']+"&postID="+messageArray[i]['postID']+"&toID="+messageArray[i]['toID']);
		a.setAttribute('data-ignore', 'push');
		a.id="link"+messageArray[i]['postID'];
		document.getElementById("messageMain").appendChild(a);


		var element = document.createElement("div");
		element.id = "message"+i;

		if(messageArray[i]['viewed']== 'false'){
			element.className += "messageunread";
		}else{
			element.className += "message";
		}

		document.getElementById("link"+messageArray[i]['postID']).appendChild(element);

		var postID = document.createElement("div");
		postID.id = "postID"+i;
		postID.className += "postID";
		document.getElementById("message"+i).appendChild(postID);



		var fromID = document.createElement("div");
		fromID.id = "fromID"+i;
		fromID.className += "fromID";
		document.getElementById("message"+i).appendChild(fromID);


		var getUser = new XMLHttpRequest();
		getUser.open("GET", api+"getuser?userID="+messageArray[i]['fromID'], false);
		getUser.send();
		var userArray = JSON.parse(getUser.response);

		fromIdText = userArray['firstName'] + " "+userArray['lastName'];



		document.getElementById("fromID" + i).innerHTML = fromIdText;


		var getPost = new XMLHttpRequest();
		getPost.open("GET", api+"getpostbyid?postID="+messageArray[i]['postID'], false);
		getPost.send();
		var postArray = JSON.parse(getPost.response);

		postIdText = postArray['title'].split("|").join(" ");

		if(postArray['deleted'] == 'true'){
			document.getElementById("postID" + i).innerHTML = postIdText + " [POST DELETED]";

		}else{
			document.getElementById("postID" + i).innerHTML = postIdText;
		}	



		var pic = document.createElement("div");
		pic.id = "pic"+i;
		pic.className += "picmessage";
		document.getElementById("message"+i).appendChild(pic);

	}




}

for(var i=messageArray.length-1; i>=0; i--){
	var picAPI = new XMLHttpRequest();
	picAPI.open("GET",  api+"getimage?"+"userID="+messageArray[i]['fromID'], true);
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

function getMessageCount(){

	var getUser = new XMLHttpRequest();
	getUser.open("GET", api+"getuser"+"?"+"userID="+myUserID+"&password="+myUserPassword, false);
	getUser.send();
	var userArray = JSON.parse(getUser.response);

	window.localStorage.setItem("messageCount", userArray['messageCount']);
}




