function main(){

	getAllUserMessagesFromDataBaseForPost($_GET("postID"));

	setInterval(function(){
		getNewUserMessagesFromDataBaseForPost("getmessagenewpost", $_GET("postID"), $_GET("fromID"));
	}, 5000)


}

function getAllUserMessagesFromDataBaseForPost(postID){

	var mymessages = new XMLHttpRequest();
	mymessages.open("GET", api+"getmessagepost?"+"userID="+myUserID+"&password="+myUserPassword+"&postID="+postID, true);
	mymessages.send();


	mymessages.onreadystatechange = function() {
		if (mymessages.readyState == 4 && mymessages.status == 200) {
			var messageArray = JSON.parse(mymessages.response);
			console.log(messageArray);

			if(messageArray['Message'] == "No Messages"){
				console.log("WORKS");
				return;
			}

			for(var i=0; i<messageArray.length; i++){

//if message string for postID is already there do nothing
if(document.getElementById(messageArray[i]['messageID']) != null){
	return;
}

if(messageArray[i]['toID'] == myUserID){

	var element = document.createElement("div");
	element.className += "messageboxleft";
	element.id = messageArray[i]['messageID'];
	element.innerHTML = messageArray[i]['content'].split("|").join(" ");
	document.getElementById("messagefeed").appendChild(element);

}else {

	var element = document.createElement("div");
	element.className += "messageboxright";
	element.id = messageArray[i]['messageID'];
	element.innerHTML = messageArray[i]['content'].split("|").join(" ");
	document.getElementById("messagefeed").appendChild(element);

}
}

var objDiv = document.getElementById("messagefeed");
objDiv.scrollIntoView(false);


}
}

}

function getNewUserMessagesFromDataBaseForPost(endpoint, postID, fromID){


	var mymessages = new XMLHttpRequest();
	mymessages.open("GET", api+endpoint+"?"+"userID="+myUserID+"&password="+myUserPassword+"&postID="+postID+"&fromID="+fromID, true);
	mymessages.send();


	mymessages.onreadystatechange = function() {
		if (mymessages.readyState == 4 && mymessages.status == 200) {
			var messageArray = JSON.parse(mymessages.response);
			console.log(messageArray);

			if(messageArray['Message'] == "No Messages"){
				console.log("WORKS");
				return;
			}
			for(var i=0; i<messageArray.length; i++){
				if(document.getElementById(messageArray[i]['messageID']) != null){
					return;
				}

				if(messageArray[i]['toID'] == myUserID){

					var element = document.createElement("div");
					element.className += "messageboxleft";
					element.id = messageArray[i]['messageID'];
					element.innerHTML = messageArray[i]['content'].split("|").join(" ");

					$('<div></div>').appendTo("#messagefeed").hide().append(element).fadeIn('slow');
					var objDiv = document.getElementById("messagefeed");
					objDiv.scrollIntoView(false);



				}else {

					var element = document.createElement("div");
					element.className += "messageboxright";
					element.id = messageArray[i]['messageID'];
					element.innerHTML = messageArray[i]['content'].split("|").join(" ");

					$('<div></div>').appendTo("#messagefeed").hide().append(element).fadeIn('slow');
					var objDiv = document.getElementById("messagefeed");
					objDiv.scrollIntoView(false);
				}
			}
		}


	}
}


function sendMessage(){
	var content = (document.getElementById("sendbox").value).replace(/\s/g, "|");;
	console.log(content);

//checks there is content to send
if(!(content.length > 0)){
	return;
}

if(!(content.length > 250)){
	alert("Message is too long! (Max 250)")
	return;
}

if(myUserID == $_GET("toID")){
	toAddress = $_GET("fromID");
}else{
	toAddress = $_GET("toID");
}

var sendmessage = new XMLHttpRequest();
sendmessage.open("GET", api+"newmessage?"+"userID="+myUserID+"&password="+myUserPassword+"&postID="+$_GET("postID")+"&content="+content+"&toID="+toAddress, true);
sendmessage.send();
sendmessage.onreadystatechange = function() {

	if (sendmessage.readyState == 4 && sendmessage.status == 200) {
		var messageArray = JSON.parse(sendmessage.response);

		document.getElementById("sendbox").value = "";

				var element = document.createElement("div");
					element.className += "messageboxright";
					element.id = "newlysent";
					element.innerHTML = content.split("|").join(" ");

					$('<div></div>').appendTo("#messagefeed").hide().append(element).fadeIn('slow');
					var objDiv = document.getElementById("messagefeed");
					objDiv.scrollIntoView(false);


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