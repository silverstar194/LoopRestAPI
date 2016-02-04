
function loadEdit(){
    document.getElementById("posttitleinput").value = window.localStorage.getItem("postedtitle");
  document.getElementById("posttext").innerHTML = window.localStorage.getItem("postedcontent");

  if(window.localStorage.getItem("postedlatitude")  == null || window.localStorage.getItem("postedlongitude") == null){
    window.localStorage.setItem("postedlatitude", latitude);
    window.localStorage.setItem("postedlongitude", longitude);
  }

}

function getTextandTitle() {
    var title = document.getElementById("posttitleinput").value;
    var content = document.getElementById("posttext").value;


    if(!validateTitle(title)){
      return;
    }


    if(!validateContent(content)){
      return;
    }

    window.localStorage.setItem("postedtitle", title);
    window.localStorage.setItem("postedcontent", content);


    window.location = 'time.html';
}

function validateContent(x) {
  if (x == null || x == "") {
        alert("Please enter a description");
        return false;
       
    }else if (75 > x.length){
        alert("Description must be at least 75 characters");
        return false;
    }else if(250 < x.length){
        alert("Description cannot be more then 250 characters");
        return false;
    }

    return true;
}

function validateTitle(x) {
    if (x == null || x == "") {
        alert("Please enter a title");
        return false;
       
    }else if (10 > x.length){
        alert("Title must be at least 10 characters");
        return false;
    }else if(40 < x.length){
        alert("Title cannot be more then 40 characters");
        return false;
    }
      return true;
}



$(function(){
     var myLocation = {
    path: 'M416,448c0,55.688-100.25,64-160,64s-160-8.313-160-64c0-41.563,55.891-56.75,109.078-61.75l9.047,31.656 C164.109,422.25,128,434,128,448c0,17.688,57.313,32,128,32c70.719,0,128-14.313,128-32c0-14-36.094-25.75-86.125-30.094 l9.063-31.656C360.125,391.25,416,406.438,416,448z M314.438,243.438L256,448l-59.922-209.719C157.938,216.125,132,175.281,132,128 C132,57.313,189.313,0,260,0s128,57.313,128,128C388,179.125,357.813,222.938,314.438,243.438z M320,128c0-35.344-28.656-64-64-64 s-64,28.656-64,64s28.656,64,64,64S320,163.344,320,128z',
    fillColor: '#00b78b',
    fillOpacity: 1,
    scale: .08,
  };
  
        $("#geocomplete").geocomplete({
          map: ".map_canvas",
          details: "form ",
          location: new google.maps.LatLng(window.localStorage.getItem("postedlatitude"), window.localStorage.getItem("postedlongitude")),
            markerOptions: {
            draggable: true,
            icon: myLocation
          }
        });
        
        $("#geocomplete").bind("geocode:dragged", function(event, latLng){
            window.localStorage.setItem("postedlatitude", latLng.lat());
            window.localStorage.setItem("postedlongitude", latLng.lng());

        });
        
      });