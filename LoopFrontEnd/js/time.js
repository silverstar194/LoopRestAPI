function postPreview() {
    document.getElementById("posttitle1").innerHTML = window.localStorage.getItem("postedtitle");
    var content = window.localStorage.getItem("postedcontent");

    if(content.length>45){
                    content= content.substring(0,45)+"...";
                }

    document.getElementById("posttext1").innerHTML = content;
    
    var picAPI = new XMLHttpRequest();
    picAPI.open("GET",  api+"getimage?"+"userID="+myUserID, true);
    picAPI.send();
    picAPI.addEventListener("load", imageHandler);



    function imageHandler(event) {
            var picObject = JSON.parse(this.response);
            profilePic = picObject.userImageSmall;
            document.getElementById("pic1").style.backgroundImage = "url("+profilePic+")";
        }
}


function postToDataBase() {
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

	getLocationAndPost(endTime);

}

function getLocationAndPost(endTime) {

    var title = window.localStorage.getItem("postedtitle").replace(/\s/g, "|");
    var content = window.localStorage.getItem("postedcontent").replace(/\s/g, "|");
	var latitude = window.localStorage.getItem("postedlatitude");
    var longitude = window.localStorage.getItem("postedlongitude");
   

    var posts = new XMLHttpRequest();
    posts.open("GET",  api+"newpost?"+"userID="+myUserID+"&password="+myUserPassword+"&title="+title+"&content="+content+"&latitude="+(Math.round(latitude* 10000) / 10000)+"&longitude="+(Math.round(longitude* 10000) / 10000)+"&endTime="+endTime, true);
    posts.send();
    posts.addEventListener("load", postHandler);

function postHandler(event) {
  var postArray = JSON.parse(this.response);

  if("Error" in  postArray){
    alert("We have detected spam and your account has been suspended.");
    return;
  }

    clearPostCache();
    window.location = "index.html";

}
}

function clearPostCache(){
	window.localStorage.removeItem("postedtitle");
	window.localStorage.removeItem("postedcontent");
    window.localStorage.removeItem("postedlatitude")
    window.localStorage.removeItem("postedlongitude")
}