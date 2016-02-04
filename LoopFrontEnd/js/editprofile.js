function main(){

	var fileInput = document.getElementById('fileInput');
	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
			var reader = new FileReader();

			reader.onload = function(e) {


				var base64result = reader.result;


				var myImage= new XMLHttpRequest();

				var parms = "userID="+myUserID+"&password="+myUserPassword+"&image="+base64result;
				myImage.open("POST", api+"updateimage", false);
				myImage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				myImage.setRequestHeader("Content-length", parms.length);
				myImage.setRequestHeader("Connection", "close");
				myImage.send(parms);

			}
			reader.readAsDataURL(file);
			alert("Updated!");


		} else {
			alert("File not supported!");
		}
	});


	document.getElementById("editname").value = window.localStorage.getItem("firstName") +" "+window.localStorage.getItem("lastName");
	document.getElementById("editbio").innerHTML = window.localStorage.getItem("bio");
	document.getElementById("email").value =window.localStorage.getItem("email");



}



function updateToDataBase(){

	var name = document.getElementById("editname").value;
	var email = document.getElementById("email").value;
	var bio = document.getElementById("editbio").value;

	if(!validateName(name)){
		return;
	}

	if(!validateEmail(email)){
		return;
	}

	if(!validateBio(bio)){
		return;
	}


	var nameArray = name.split(" ");
	

	bio = bio.replace(/\s/g, "|");



	var posts = new XMLHttpRequest();
	posts.open("GET",  api+"updateuser?"+"userID="+myUserID+"&firstName="+nameArray[0]+"&lastName="+nameArray[1]+"&latitude="+latitude+"&longitude="+longitude+"&email="+email+"&password="+myUserPassword+"&userName="+username+"&bio="+bio, false);
	posts.send();


	window.localStorage.setItem("firstName", nameArray[0])
	window.localStorage.setItem("lastName", nameArray[1]);
	window.localStorage.setItem("bio", bio.split("|").join(" "));
	window.localStorage.setItem("email", email);
	alert("Updated!");
}



function validateName(x) {
	if (x == null || x == "") {
		alert("Please enter a name");
		return false;

	} else if(!(/\s/.test(x))){
		alert("Please enter first and last name");
		return false;
	}

	return true;
}

function validateBio(x) {
	if (x == null || x == "") {
		alert("Please enter a bio");
		return false;

	}else if (50 > x.length){
		alert("Bio must be at least 50 characters");
		return false;
	}else if(250 < x.length){
		alert("Title cannot be more then 250 characters");
		return false;
	}
	return true;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(email)){
		return true;
	}else{
		alert("Email not vaild");
		return false;
	}
}