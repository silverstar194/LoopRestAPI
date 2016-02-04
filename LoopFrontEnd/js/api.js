var api= "http://localhost:8080/Loop/api/";


function getPostsFromDataBase(endpoint, userID, password, sortby, max){

	var myposts = new XMLHttpRequest();
	myposts.open("GET", api+endpoint+"?"+"userID="+userID+"&password="+password+"&sortby="+sortby+"&max="+max, true);
	myposts.send();

	var postArrayObjects =[];

	myposts.onreadystatechange = function() {
		if (myposts.readyState == 4 && myposts.status == 200) {
			var postArray = JSON.parse();

			for(var i=0; i<postArray.length; i++){
				var post = new Post(postArray[i]['postID'], postArray[i]['title'], postArray[i]['content'], postArrayi]['time'], postArray[i]['userID'], postArray[i]['endTime']);

				postArray.push(post);
			}
		}

		}
	}
