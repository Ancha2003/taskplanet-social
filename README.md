# Social Media Application

A full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). This project features user authentication, a public feed, post creation with images, and real-time interactions like likes and comments.

## 🚀 Features

- **User Authentication**: Secure signup and login with email/password using JWT and bcrypt.
- **Public Feed**: View all posts from all users in reverse chronological order.
- **Create Posts**: Share text, images (via URL), or both.
- **Interactions**: Like/unlike posts and add comments instantly.
- **Responsive UI**: Clean and modern interface built with Material UI (MUI).
- **Toast Notifications**: Real-time feedback for user actions.

## 🛠 Tech Stack

- **Frontend**: React.js, Material UI (MUI), Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas.
- **Authentication**: JSON Web Tokens (JWT), bcryptjs.

## 📂 Project Structure

```text
├── backend/           # Node.js + Express server
│   └── server.ts      # Main server file with Models and Routes
├── frontend/          # React.js application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages (Feed, Auth)
│   │   ├── api.ts      # Axios configuration for API calls
│   │   └── App.tsx     # Main application logic
│   └── ...
└── README.md
```

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### Steps

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd social-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI="your_mongodb_atlas_connection_string"
   JWT_SECRET="your_random_secret_key"
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 🌐 Hosting Instructions

### 1. Database: MongoDB Atlas
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- In "Network Access", allow access from "0.0.0.0/0" (required for Render).
- Copy your connection string and replace `<password>` with your database user password.

### 2. Backend: Render
- Sign up on [Render](https://render.com/).
- Create a new **Web Service** and connect your GitHub repository.
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`: Your MongoDB Atlas connection string.
  - `JWT_SECRET`: A long random string for security.
  - `NODE_ENV`: `production`

### 3. Frontend: Netlify
- Sign up on [Netlify](https://www.netlify.com/).
- Create a new site from Git and connect your repository.
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: The URL of your deployed Render backend (e.g., `https://your-app.onrender.com`).
- **Redirects**: Create a `public/_redirects` file in the `frontend` folder with the following content to support React Router:
  ```text
  /*  /index.html  200
  ```

## 📝 License

This project is licensed under the MIT License.
