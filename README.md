🚑 Emergency – Real-time Ambulance & Hospital Coordination App<br> <br>

Emergency is a MERN-based web application that connects users to the nearest hospitals during critical situations.<br>
It allows users to send ambulance requests instantly, share live locations, and enables hospitals to accept and manage those requests efficiently.<br>

A quick-response emergency app that brings help closer — when every second counts.<br>

Tech Stack<br>
Frontend<br>
React.js (Vite) – UI development <br>
Axios – for API communication <br>
Tailwind CSS – clean, responsive styling <br>
React Router – for route management <br>

Backend<br><br>
Node.js & Express.js – RESTful API <br>
MongoDB with Mongoose – database & schema modeling <br>
JWT Authentication – secure login system <br><br>

Features <br><br>
For Users<br>
Sign up and login securely using JWT authentication.<br>
Share real-time location automatically or manually.<br>
View nearby hospitals dynamically based on location.<br>
Send emergency ambulance requests to selected hospitals.<br>
Rate hospitals after receiving service.<br><br>

For Hospitals<br><br>
Receive ambulance requests from nearby users.<br>
Accept or complete user requests.<br>
Manage hospital details and ambulance information.<br><br>

API Endpoints Overview<br><br>
Role	Method	Endpoint	Description<br>
User	POST	/signup	Register new user<br>
User	POST	/login	User login<br>
User	PUT	/user/location	Update or save user’s current location<br>
User	GET	/hospitals/nearby	Fetch nearby hospitals<br>
User	GET	/hospital/:id	Get details of a specific hospital<br>
User	POST	/ratings	Rate a hospital<br>
Patient	POST	/patient/request	Send ambulance request<br>
Hospital	PATCH	/request/:id/accept	Accept a user request<br>
Hospital	PATCH	/request/:id/complete	Mark a request as completed<br>
Hospital	POST	/hospital	Register a hospital<br>
Hospital	POST	/ambulance	Add ambulance details<br>
