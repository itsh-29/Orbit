    # ◎ Orbit

A modern real-time collaboration platform built for seamless video meetings, communication, and team productivity.

Orbit provides secure video conferencing, instant meeting creation, meeting history tracking, and real-time communication powered by WebRTC and Socket.IO.

---

## 🚀 Features

### Authentication

* User Registration
* Secure Login
* Protected Routes
* JWT-based Authentication

### Meetings

* Instant Meeting Creation
* Join Existing Meetings
* Unique Room IDs
* Real-Time Video Communication
* Audio Controls
* Camera Controls
* Screen Sharing
* End Meeting Functionality

### Collaboration

* Real-Time Chat
* Meeting History Tracking
* Rejoin Previous Meetings
* Multi-Participant Support

### User Experience

* Modern Orbit Design System
* Responsive UI
* Premium Black & Bronze Theme
* Mobile-Friendly Layout
* Fast Navigation

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Material UI
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose
* JWT Authentication

### Real-Time Communication

* WebRTC
* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

```text
Orbit
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── contexts
│   │   ├── styles
│   │   └── utils
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   └── app.js
│
└── README.md
```

---

## ⚡ Getting Started

### Clone Repository

```bash
git clone https://github.com/itsh-29/Orbit.git
cd Orbit
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

### Backend

Create a `.env` file:

```env
PORT=8000

MONGO_URI=YOUR_MONGODB_CONNECTION

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Architecture

```text
Frontend (React + Vercel)
            │
            ▼
Backend (Node + Express + Render)
            │
            ▼
MongoDB Atlas
            │
            ▼
Socket.IO + WebRTC
```

---

## Upcoming Features

* Meeting Lobby Screen
* User Profiles
* Meeting Invitations
* Meeting Scheduling
* Participant Management
* File Sharing
* AI Meeting Notes
* Meeting Recordings
* Dark/Light Themes

---

## Author

Ishan Meduri

B.Tech Information Technology
Manipal Institute of Technology Bengaluru

GitHub:
https://github.com/itsh-29

---

## License

This project is licensed under the MIT License.
