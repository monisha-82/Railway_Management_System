# Railway Management System (IRCTC Clone)

A **Railway Management System** built with **Node.js, Express.js, and MySQL** that allows users to check train availability, book seats, and manage bookings with real-time **race condition handling**.

## Features

**User Authentication** (Register/Login with JWT)  
**Role-Based Access Control** (Admin & User)  
**Train Management** (Add, List Trains)  
**Seat Availability Checking**  
**Real-Time Seat Booking** (Handles concurrency using transactions & row locks)  
**Admin API Key Security**  
**MySQL Database Integration**

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Security:** JWT Authentication, API Key Protection
- **Tools:** Postman, MySQL Workbench

---

## Setup & Installation

### **Step 1: Clone the Repository**

```sh
git clone https://github.com/monisha-82/Railway_Management_System.git
cd Railway_Management_System
```

### **Step 2: Install Dependencies**

```sh
npm install
```

### **Step 3: Setup MySQL Database**

1. Start MySQL server and Login into it(I have used `mysql -u root -p` command in terminal to access my mysql server)

2. Create a new database:

```sh
CREATE DATABASE railway_system;
```

3. Run the following SQL schema:

```sh
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    train_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

### **Step 4: Configure Environment Variables**

Create a .env file in the root directory:

```sh
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password_of_user
DB_NAME=railway_system
JWT_SECRET=your_secret_key
ADMIN_API_KEY=your_admin_api_key
```

### **Step 5: Start the Server**

```sh
node server.js
```

The server will start at http://localhost:5000

---

## API Endpoints

### Authentication

| Endpoint             | Method | Description                      |
| -------------------- | ------ | -------------------------------- |
| `/api/auth/register` | POST   | Register a new user (admin/user) |
| `/api/auth/login`    | POST   | Login and get JWT token          |

### Train Management (Admin Only)

| Endpoint           | Method | Description                        |
| ------------------ | ------ | ---------------------------------- |
| `/api/trains/add`  | POST   | Add a new train (Requires API Key) |
| `/api/trains/list` | GET    | Get a list of all trains           |

### Seat Availability & Booking

| Endpoint                     | Method | Description                               |
| ---------------------------- | ------ | ----------------------------------------- |
| `/api/bookings/availability` | GET    | Get available trains between two stations |
| `/api/bookings/book`         | POST   | Book a seat on a train (Requires JWT)     |
| `/api/bookings/my-bookings`  | GET    | Get user’s booking details                |

## Assumptions

- Race Conditions Handled: Used MySQL transactions with row-level locking (FOR UPDATE).
- Admin API Key: Required for train management.
- JWT Required for Bookings: Users must be authenticated to book seats.
- Seats are limited: Once seats are full, no more bookings will be allowed.

## Future Enhancements

- Add frontend interface using React or Angular
- Implement seat selection
- Add email notifications for booking confirmations
- Integrate payment gateway
