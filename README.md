# 🌍 Airbnb Clone - MERN Stack

![MongoDB](https://img.shields.io/badge/MongoDB-black?logo=mongodb)
![Express.js](https://img.shields.io/badge/Express.js-black?logo=express)
![React](https://img.shields.io/badge/React-black?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-black?logo=node.js)

A full-featured Airbnb-like platform built using the MERN stack. This project was developed as a proof of deep understanding of full-stack web development, including authentication, CRUD operations, RESTful APIs, state management, and coding practices.

---

## 📚 Table of Contents

- [📌 Project Overview](#-project-overview)
- [🚀 Tech Stack](#-tech-stack)
- [🔨 Architecture](#️-architecture)
- [📂 Folder Structure Overview](#-folder-structure-overview)
- [✨ Key Features](#-key-features)
- [📁 Database Schema Design](#-database-schema-design)
- [📘 API Overview](#-api-overview)
- [🌐 Hosted Version](#-hosted-version)
- [⚙️ Setup Instructions](#️-setup-instructions)
- [👨‍💻 Connect with Me](#-connect-with-me)

---

## 📌 Project Overview

- 🔒 `User Auth` : Register, login, logout (Passport + session)
- 🏡 `Listings CRUD` : Owners can create, update, delete listings
- ⭐ `Reviews` : Users can rate and review listings
- 🧑‍🦱 `Users` : view listings and reviews
- ❤️ `Wishlist` : Save favorite listings
- 🔍 `Search & Categories` : Filter listings

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 7
- **State Management**: Context Api
- **HTTP Client**: Axios
- **UI Elements**: Bootstrap
- **UI Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js with Express 4
- **Database**: MongoDB (Mongoose 8)
- **Authentication**: Passport.js with local strategy
- **Session Management**: Express-session with Connect-Mongo store
- **Validation**: Joi
- **Environment Variables**: dotenv

---

## 🛠️ Architecture

The application follows a standard client-server architecture:

1. **Frontend (React)**: Single-page application with component-based architecture
2. **Backend (Express)**: RESTful API server with MVC pattern
3. **Database (MongoDB)**: NoSQL document database 

![Project Architecture Overview.jpg](https://res.cloudinary.com/dsbsmaj3b/image/upload/v1745903483/Project_Architecture_Overview_cgory8.jpg)

---

## 📂 Folder Structure Overview

```bash
airbnb-clone/

├── client/                # React frontend
│   ├── src/
│   │   ├── api/           # Axios instance setup
│   │   ├── components/    # UI components
│   │   ├── context/       # Auth and wishlist context
│   │   ├── pages/         # Page views
│   │   ├── services/      # Services to handle api calls
│   │   └── utils/         # Helper functions (Async api wrapper with toast)

├── server/                # Node + Express backend
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Auth and schema validation middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # RESTful API routes
│   └── utils/             # Helper utilities (custom error classes, Joi definitions, Async wrapper)
```

---

## ✨ Key Features

- ### 🔐 Secure Auth : 
  - **Client** : 
    - Context-based Auth Flow : Centralized login/logout/user state.
  - **Server** : 
    - Passport.js with MongoDB session store.
    - Middleware for authorization checks.

- ### 🛡️ Validation :  
  - **Client-side** form validation via Bootstrap.
  - **Server-side** schema validation using JOI middleware

- ### ❗ Error Handling :  
  - **Client** : 
    - Async API wrapper (for axios services).
    - Toast notifications on failure.
  - **Server**: 
    - Custom error class.
    - Async wrapper.
    - Centralised error handling middleware.  

- ### 👨‍💻 Code Practices :  
  - MVC Pattern : Logical separation of models, views, and controllers.
  - Modular folder structure (services and routes)  
  - Automatic review cleanup when a listing is deleted

---

## 📁 Database Schema Design

![Schema_Design.jpg](https://res.cloudinary.com/dsbsmaj3b/image/upload/v1745903484/Schema_Design_p9flwk.jpg)

### 🧑‍💻 User Schema

| Field     | Type    | Description                                      |
|-----------|---------|--------------------------------------------------|
| email     | String  | User's email address (required)                   |
| username  | String  | Managed by `passport-local-mongoose`                    |
| password  | String  | Hashed, Salted and Managed by `passport-local-mongoose` |
| wishlist  | Array   | Array of referenced Listing IDs saved by user           |

### 🏠 Listing Schema

| Field       | Type          | Description                                       |
|-------------|---------------|---------------------------------------------------|
| title       | String         | Title of the listing (required)                   |
| description | String         | Detailed description of the listing (required)    |
| images      | Array<String>  | Array of up to 3 image URLs                       |
| categories  | Array<String>  | Categories selected from a predefined list        |
| price       | Number         | Price per night or per unit                       |
| location    | String         | Specific location (city, area)                    |
| country     | String         | Country where the listing is located              |
| reviews     | Array          | Array of Review IDs associated with this listing  |
| owner       | Reference      | Reference to the User who created the listing     |

### ✍️ Review Schema

| Field      | Type      | Description                                   |
|------------|-----------|-----------------------------------------------|
| comment    | String    | Text content of the review                    |
| rating     | Number    | Rating score between 1 and 5                  |
| createdAt  | Date      | Date and time when the review was created     |
| author     | Reference | Reference to the User who wrote the review    |

---

## 📘 API Overview

### 🧑‍💻 User Routes

| Feature         | Request Type | Endpoint                         | Authentication | Authorization | Validation |
| --------------- | ------------ | -------------------------------- | -------------- | ------------- | ---------- |
| Sign Up         | POST         | `/api/users/signup`              | ❌              | ❌             | ❌          |
| Login           | POST         | `/api/users/login`               | ❌              | ❌             | ❌          |
| Logout          | GET          | `/api/users/logout`              | ✅              | ❌             | ❌          |
| Get Current     | GET          | `/api/users/current`             | ✅              | ❌             | ❌          |
| Get Wishlist    | GET          | `/api/users/wishlist`            | ✅              | ❌             | ❌          |
| Add to Wishlist | POST         | `/api/users/wishlist/:listingId` | ✅              | ✅             | ❌          |
| Delete Wishlist | DELETE       | `/api/users/wishlist/:listingId` | ✅              | ✅             | ❌          |

![UserRoutes.jpg](https://res.cloudinary.com/dsbsmaj3b/image/upload/v1745903493/UserRoutes_fbrgrx.jpg)

### 🏠 Listing Routes

| Feature        | Request Type | Endpoint            | Authentication | Authorization | Validation |
| -------------- | ------------ | ------------------- | -------------- | ------------- | ---------- |
| Get Listings   | GET          | `/api/listings`     | ❌              | ❌             | ❌          |
| Create Listing | POST         | `/api/listings`     | ✅              | ❌             | ✅          |
| Get Listing    | GET          | `/api/listings/:id` | ❌              | ❌             | ❌          |
| Update Listing | PUT          | `/api/listings/:id` | ✅              | ✅             | ✅          |
| Delete Listing | DELETE       | `/api/listings/:id` | ✅              | ✅             | ❌          |

![ListingRoutes.jpg](https://res.cloudinary.com/dsbsmaj3b/image/upload/v1745903500/ListingRoutes_yps39b.jpg)

### ✍️ Review Routes

| Feature       | Request Type | Endpoint                              | Authentication | Authorization | Validation |
| ------------- | ------------ | ------------------------------------- | -------------- | ------------- | ---------- |
| Get Review    | GET          | `/api/listings/:id/reviews`           | ❌              | ❌             | ❌          |
| Add Review    | POST         | `/api/listings/:id/reviews`           | ✅              | ❌             | ✅          |
| Delete Review | DELETE       | `/api/listings/:id/reviews/:reviewId` | ✅              | ✅             | ❌          |

![ReviewRoutes.jpg](https://res.cloudinary.com/dsbsmaj3b/image/upload/v1745903489/ReviewRoutes_qt5ckr.jpg)

---


## 🌐 Hosted Version

You can try out the deployed version of the project here:  
🔗 `Vist Website :` [airbnb-clone-mern-stack.onrender.com](https://airbnb-clone-mern-stack.onrender.com)

 <img src="https://res.cloudinary.com/dsbsmaj3b/image/upload/v1746007099/airbnb-clone-mern-stack-qr-code_ftlei9.png" width="200" alt="airbnb-clone-mern-stack-qr-code.png" />

> ⚠️ **Note:** This app is hosted on Render's free tier.  
> It may take up to **1 minute** to load if the service has been inactive (cold start delay).

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally on your machine:

```bash
# 1. Clone the Repository
git clone https://github.com/Ananay-S/airbnb-clone-mern-stack.git
cd airbnb-clone-mern-stack

# 2. Initialize the Local Database (installed MongoDB)
cd init
npm install
node init.js
# Seeds the MongoDB database with sample data

# 3. Backend (in a new terminal)
cd server
npm install
node server.js
# → Server should now be running on http://localhost:8080

# 4. Frontend (in a new terminal)
cd client
npm install
npm run dev
# → React app should now be running on http://localhost:5173
```

> Note : No `.env` files are needed. All configuration values are hardcoded for local use.

---

## 👨‍💻 Connect with Me

- `Email : ` [singhal.ananay@gmail.com](mailto:singhal.ananay@gmail.com)
- `LinkedIn : `[Connect with Me](https://www.linkedin.com/in/ananaysinghal) 
- `Portfolio : `[Visit Portfolio]()
- `GitHub :` [github.com/Ananay-S](https://github.com/Ananay-S)


[🔼](#readme)

