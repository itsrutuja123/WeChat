# WeChat - A Real-Time Chat Application (MERN Stack)

## 📌 Overview
WeChat is a real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create accounts, send and receive messages instantly, and engage in seamless one-on-one and group conversations.

## 🚀 Features
- **Real-time Messaging**: Instant chat powered by WebSockets (Socket.io).
- **User Authentication**: Secure login and signup with JWT authentication.
- **Private & Group Chats**: One-on-one and group conversations.
- **Media Support**: Send images, videos, and other files.
- **Online/Offline Status**: See when users are active.
- **Notifications**: Receive alerts for new messages.
- **Responsive UI**: Fully mobile-friendly interface.

## 🛠️ Tech Stack
- **Frontend**: React.js, Redux (for state management), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Cloud Storage**: (Optional) Firebase/Cloudinary for media uploads

## 📂 Project Structure
```
WeChat/
│-- backend/
│   │-- controllers/
│   │-- models/
│   │-- routes/
│   │-- server.js
│   │-- config/
│-- frontend/
│   │-- src/
│   │-- components/
│   │-- pages/
│   │-- App.js
│-- README.md
│-- package.json
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/wechat.git
cd wechat
```

### 2️⃣ Install Dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `backend` folder and add the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SOCKET_PORT=5000
```

### 4️⃣ Run the Application
#### Start Backend Server
```bash
cd backend
npm run dev
```
#### Start Frontend Server
```bash
cd frontend
npm start
```

## 🔥 Usage
1. Register or log in.
2. Search for users and start chatting.
3. Send text messages, images, and other media.
4. Join or create group chats.

## 🎯 Future Enhancements
- **Voice & Video Calls**
- **Message Reactions & Emojis**
- **End-to-End Encryption**
- **User Profile Customization**


## 🤝 Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

