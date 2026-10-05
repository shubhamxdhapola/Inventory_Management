# Inventory Management API

A backend REST API for managing inventory products with **user
authentication, authorization, and user-level data isolation**.

The original requirement was to build CRUD APIs for inventory
management. As an additional feature, this project includes
authentication and authorization so that only authenticated users can
perform inventory operations, and each user can access only their own
inventory data.

## 🚀 Features

-   User registration and login
-   JWT-based authentication
-   Secure authentication middleware
-   HTTP-only cookie based token handling
-   Inventory/Product CRUD APIs
-   User-level data isolation
-   MongoDB database integration
-   Mongoose models
-   Centralized error handling
-   Transaction model for tracking inventory-related operations
-   Environment variable based configuration
-   RESTful API structure

## 🛠️ Tech Stack

-   **Node.js**
-   **Express.js**
-   **MongoDB**
-   **Mongoose**
-   **JWT (JSON Web Token)**
-   **JavaScript**
-   **HTTP-only Cookies**
-   **dotenv**

## 📁 Project Structure

``` text
inventory_management/
│
├── configs/
│   └── db.js
│
├── controllers/
│   ├── product.controller.js
│   └── user.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── product.model.js
│   ├── transaction.model.js
│   └── user.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── product.routes.js
│
├── utils/
│   ├── generateToken.js
│   └── saveCookie.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## 🔐 Authentication & Authorization

The API uses JWT-based authentication.

When a user logs in successfully:

1.  The server generates a JWT.
2.  The token is stored in a secure HTTP-only cookie.
3.  Protected routes use authentication middleware.
4.  The middleware verifies the token and identifies the logged-in user.
5.  Product operations are performed only for that authenticated user.

### User Data Isolation

A key additional feature of this project is **user-level data
isolation**.

For example:

``` text
User A
 ├── Product 1
 ├── Product 2
 └── Product 3

User B
 ├── Product 4
 └── Product 5
```

User A cannot read, update, or delete User B's products.

This prevents users from accessing each other's inventory data and makes
the API closer to a real-world multi-user application.

## 🔄 API Flow

``` text
Client
  │
  ▼
Authentication
  │
  ▼
JWT Cookie
  │
  ▼
Auth Middleware
  │
  ├── Invalid / Missing Token → 401 Unauthorized
  │
  ▼
Product Controller
  │
  ▼
MongoDB / Mongoose
  │
  ▼
Response
```

## 📌 API Endpoints

### Authentication

  Method   Endpoint               Description           Auth
  -------- ---------------------- --------------------- ------
  POST     `/api/auth/register`   Register a new user   ❌
  POST     `/api/auth/login`      Login user            ❌
  POST     `/api/auth/logout`     Logout user           ✅

### Products / Inventory

  Method   Endpoint              Description                         Auth
  -------- --------------------- ----------------------------------- ------
  POST     `/api/products`       Create a product                    ✅
  GET      `/api/products`       Get authenticated user's products   ✅
  GET      `/api/products/:id`   Get a specific product              ✅
  PUT      `/api/products/:id`   Update a product                    ✅
  DELETE   `/api/products/:id`   Delete a product                    ✅

> **Note:** Update the endpoint prefixes above if your `auth.routes.js`
> or `product.routes.js` uses different route paths.

## 📦 Example Product Request

``` json
{
  "name": "Wireless Mouse",
  "quantity": 50,
  "price": 799
}
```

Example response:

``` json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "name": "Wireless Mouse",
    "quantity": 50,
    "price": 799
  }
}
```

## ⚙️ Environment Variables

Create a `.env` file in the project root:

``` env
DB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret
```

### Important

Never commit `.env` to GitHub.

Make sure `.env` is included in `.gitignore`.

## ▶️ Getting Started

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd inventory_management
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

``` env
DB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

For development:

``` bash
npm run dev
```

Or:

``` bash
npm start
```

The server will run on:

``` text
http://localhost:5001
```

## 🧪 Testing the APIs

The APIs can be tested using tools such as:

-   Postman
-   Thunder Client
-   Insomnia

Recommended flow:

``` text
Register
   ↓
Login
   ↓
JWT Cookie
   ↓
Create Product
   ↓
Read Products
   ↓
Update Product
   ↓
Delete Product
```

## 🧠 Design Decisions

### Why authentication?

The basic requirement was CRUD functionality. Authentication was added
so that inventory operations are available only to authenticated users.

### Why data isolation?

In a multi-user inventory system, users should not be able to access or
modify another user's inventory.

Therefore, product queries are associated with the authenticated user's
identity.

Conceptually:

``` js
Product.find({
  user: req.user._id
});
```

This ensures that the API operates within the current user's data scope.

### Why JWT?

JWT provides a stateless authentication mechanism and works well for
REST APIs.

### Why middleware?

Authentication logic is kept inside middleware so that protected routes
remain clean and the same authentication logic can be reused across
multiple endpoints.

## 🔒 Security Considerations

-   JWT authentication
-   HTTP-only cookies
-   Protected inventory routes
-   User-level authorization
-   User data isolation
-   Environment variables for secrets
-   Centralized error handling
-   MongoDB/Mongoose validation

## 🔮 Possible Future Improvements

-   Role-based access control
-   Admin dashboard
-   Product search and filtering
-   Pagination
-   Sorting
-   Low-stock alerts
-   Inventory history
-   Stock in/out transactions
-   Product categories
-   Input validation using Zod/Joi
-   Rate limiting
-   API documentation with Swagger
-   Automated testing with Jest/Supertest

## 📚 What I Added Beyond the Requirement

The original task was to create **Inventory Management CRUD APIs**.

I additionally implemented:

1.  **Authentication** -- only logged-in users can perform protected
    operations.
2.  **Authorization** -- users are allowed to operate within their
    permitted resources.
3.  **Data Isolation** -- one user cannot access another user's
    inventory.
4.  **Secure Cookie Handling** -- JWT is handled through cookies.
5.  **Centralized Error Handling** -- common API errors are handled
    through middleware.

These additions make the project more secure and closer to a real-world
production API.

## 👨‍💻 Project Explanation

This project demonstrates my understanding of:

-   REST API development
-   Express.js architecture
-   MongoDB and Mongoose
-   JWT authentication
-   Middleware
-   Authorization
-   CRUD operations
-   User-level data isolation
-   Error handling
-   Backend project structure

I have worked on and understand the complete implementation, so I can
confidently explain any part of the project, including the
authentication flow, authorization, API design, database structure, and
data isolation.

------------------------------------------------------------------------

**Built with Node.js, Express.js and MongoDB.**
