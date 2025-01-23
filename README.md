# Expense Tracker Backend

This repository contains the **backend** implementation for a full MERN stack Expense Tracker application. The backend is built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for user authentication, category management, and transaction handling. The frontend of this project will be uploaded soon.

## Features
- **User Management**:
  - User registration and login.
  - Secure authentication with JWT tokens.
- **Category Management**:
  - Create, update, delete, and list categories.
  - Categories are user-specific and linked to transactions.
- **Transaction Management**:
  - Add, edit, delete, and view transactions.
  - Transactions are categorized and associated with users.
- **Error Handling**:
  - Centralized error handling for API responses.
- **Middleware**:
  - Authentication middleware to secure endpoints.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB, providing schema validation and query building.
- **JWT (jsonwebtoken)**: For secure authentication and user session management.
- **bcrypt.js**: For hashing passwords.
- **express-async-handler**: Simplifies error handling in asynchronous routes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker-backend.git
   cd expense-tracker-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=8000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The backend server will start at `http://localhost:5000`.

## API Endpoints
### **User Routes**
- **POST** `/api/v1/users/register`: Register a new user.
- **POST** `/api/v1/users/login`: Authenticate a user and return a token.
- **GET** `/api/v1/users/profile`: Get the authenticated user's profile details.
- **PUT** `/api/v1/users/change-password`: Change the authenticated user's password.
- **PUT** `/api/v1/users/update-profile`: Update the authenticated user's profile details.

### **Category Routes**
- **POST** `/api/v1/categories/create`: Create a new category.
- **GET** `/api/v1/categories/lists`: List all categories for the authenticated user.
- **PUT** `/api/v1/categories/update/:id`: Update a category by ID.
- **DELETE** `/api/v1/categories/delete/:id`: Delete a category by ID.

### **Transaction Routes**
- **POST** `/api/v1/transactions/create`: Add a new transaction.
- **GET** `/api/v1/transactions/lists`: List all transactions for the authenticated user.
- **PUT** `/api/v1/transactions/update/:id`: Update a transaction by ID.
- **DELETE** `/api/v1/transactions/delete/:id`: Delete a transaction by ID.

## Folder Structure
```
backend
├── controllers
│   ├── userCtrl.js
│   ├── categoryCtrl.js
│   └── transactionCtrl.js
├── middleware
│   └── isAuth.js
├── models
│   ├── User.js
│   ├── Category.js
│   └── Transaction.js
├── routes
│   ├── userRoutes.js
│   ├── categoryRoutes.js
│   └── transactionRoutes.js
├── app.js
└── package.json
```

## Future Work
- Integrate with the frontend (React.js).
- Add advanced filtering and sorting for transactions.
- Implement detailed analytics for income and expenses.

## Contributing
Contributions are welcome! If you find any bugs or want to add new features, feel free to create an issue or submit a pull request.



## Author
[Chamth Sandeepa](www.linkedin.com/in/chamith-sandeepa-557496290)

