function main(){
	getPostsFromDataBase("getallpostbyid")

}

function getPostsFromDataBase(endpoint){

	var myposts = new XMLHttpRequest();
	myposts.open("GET", api+endpoint+"?"+"userID="+myUserID+"&password="+myUserPassword, true);
	myposts.send();
	


	myposts.onreadystatechange = function() {
		if (myposts.readyState == 4 && myposts.status == 200) {
			var postArray = JSON.parse(myposts.response);
			console.log(postArray);
			if("Message" in postArray){
				document.getElementById("noposts").innerHTML = "Looks like you haven't started any activites..."
			}

			for(var i=0; i<postArray.length; i++){

				if(document.getElementById('link'+i) != null){
					var myNode = document.getElementById('link'+i);
					while (myNode.firstChild) {
						myNode.removeChild(myNode.firstChild);
					}
				}

				var a = document.createElement('a');
				if(postArray[i]['deleted'] == 'true'){
					a.setAttribute('href', '#');	
				}else{
					a.setAttribute('href', 'editmypost.html?post='+i);	
				}

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

				if(postArray[i]['deleted'] == 'true' && postArray[i]['spam'] == 'true'){
					document.getElementById("posttitle" + i).innerHTML = title + " [MARKED SPAM]";

				}else if (postArray[i]['deleted'] == 'true'){
					document.getElementById("posttitle" + i).innerHTML = title + " [POST DELETED]";

				}else{
					document.getElementById("posttitle" + i).innerHTML = title;
				}	



				var posttext = document.createElement("div");
				posttext.id = "posttext"+i;
				posttext.className += "posttext";
				document.getElementById("post"+i).appendChild(posttext);

				content = postArray[i]['content'].split("|").join(" ");

				if(content.length>45){
					content= content.substring(0,45)+"...";
				}

				document.getElementById("posttext" + i).innerHTML = content;

				var pic = document.createElement("div");
				pic.id = "pic"+i;
				pic.className += "pic";
				document.getElementById("post"+i).appendChild(pic);




	//send posts to storage
	window.localStorage.setItem("mytitle"+i, postArray[i]['title']);

	window.localStorage.setItem("mycontent"+i, postArray[i]['content']);

	window.localStorage.setItem("mypostID"+i, postArray[i]['postID']);

	window.localStorage.setItem("myuserID"+i, postArray[i]['userID']);

	window.localStorage.setItem("myendTime"+i, postArray[i]['endTime'])

	window.localStorage.setItem("mytime"+i, postArray[i]['time']);

	window.localStorage.setItem("mylatitude"+i, postArray[i]['latitude']);

	window.localStorage.setItem("mylongitude"+i, postArray[i]['longitude']);


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

