Loop
www.useloop.xzy
https://github.com/silverstar194/LoopRestAPI

	Loop allows you to connect with young professionals in your immediate area. Loop provides the connection that allows you to meet someone new, discuss projects and make networking connections while maintaining a relaxed and casual tone.

Overview:
	The app utilizes PhoneGap to be across platforms (both IOS and Android) . The front end is HTML (styled with CSS) and javascript while the server side is written in Java as a RESTful API. All user information and posts are held in a MySQL database.

All interactions between the javascript frontend and java backend are done through JSON requests using the following URL paths.
/hello
/login
/newuser
/getuser
/updateuser
/updatelocation
/updatepassword
/deleteuser
/newpost
/getpostbyid
/getallpostbyid
/getposts
/deletepost
/newmessage
/updatepost
/getmessage
/getmessagepost
/getmessagenewpost
/getnewmessage
/saveimage
/getimage
/updateimage
/reportspam


Backend:
	The backend is written in Java and manages user accounts, posts, images, and interaction with MySQL database as well as sorting algorithm for proximity and time of posting. The  backend is broken into classes of Database, Endpoint, Message, Post, Sort, Location, User, and UserImage.

Frontend Design:
	The front end is written in javascript and mostly acts to parse the JSON responses from the server. It also interacts with Google Maps API and Genderize.io (to determine gender of name for default profile picture). Each HTML webpage has an associated javascript file with functions specifically for that page's functionality in order to minimize load time of page.

Database Design:
	The MySQL database is broken into the following tables: User, Post, Message, UserMap, UserImage, UserLocation and Post Location. (Please see PNG of layout in the DataBaseScripts directory for all details).

UI Design:
	I wanted the UI to be as clean and intuitive as possible. If I hand the app to someone to look at and they need to ask me what to do I believe I have failed. (Please see ScreenShots directory for screenshots).

Problems Overcome:
	Some problems I faced making Loop were passing images using JSON, security while passing passwords as an URL parameter and security once password were stored. I overcame the problem of images by encoding them as base64 strings because the images were 50x50 pixels or 100x100 pixels the sacrifice of increased size seemed insignificant for the ease of implementation. I solved the problem of URL parameter security  by hashing the user's password (SHA-256) in javascript then passing the hashed password as a URL parameter. Once on the server the hash is then salted with the user's ID before it is rehashed(also SHA-256) and placed in the MySQL database.

GitHub:
Please feel free to view all source code, screenshots and database layout on github:
https://github.com/silverstar194/LoopRestAPI
