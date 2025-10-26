🚑 Emergency – Real-time Ambulance & Hospital Coordination App

Emergency is a MERN-based web application that connects users to the nearest hospitals during critical situations.
It allows users to send ambulance requests instantly, share live locations, and enables hospitals to accept and manage those requests efficiently.

💡 A quick-response emergency app that brings help closer — when every second counts.

🧠 Tech Stack

🌐 Frontend
React.js (Vite) – UI development
Zustand – lightweight global state management
Axios – for API communication
Tailwind CSS – clean, responsive styling
React Router – for route management

⚙️ Backend
Node.js & Express.js – RESTful API
MongoDB with Mongoose – database & schema modeling
JWT Authentication – secure login system

🧩 Features
👩‍⚕️ For Users
✅ Sign up / Login securely with JWT
📍 Share real-time location automatically or manually
🏥 View nearby hospitals dynamically
🚑 Send emergency ambulance request to selected hospitals
⭐ Rate hospitals after service
🏥 For Hospitals
📨 Receive ambulance requests from nearby users
🟢 Accept or 🔴 Complete requests
🧾 Manage hospital details and ambulance information

🔗 API Endpoints Overview
Role	Method	Endpoint	Description
User	POST	/signup	Register new user
User	POST	/login	User login
User	PUT	/user/location	Update or save user’s current location
User	GET	/hospitals/nearby	Fetch nearby hospitals
User	GET	/hospital/:id	Get details of a specific hospital
User	POST	/ratings	Rate a hospital
Patient	POST	/patient/request	Send ambulance request
Hospital	PATCH	/request/:id/accept	Accept a user request
Hospital	PATCH	/request/:id/complete	Mark request as completed
Hospital	POST	/hospital	Register hospital
Hospital	POST	/ambulance	Add ambulance details
