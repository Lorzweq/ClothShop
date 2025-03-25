# ebayzalando - E-commerce Platform

Ebayzalando is a modern e-commerce platform built with React and Vite. It allows users to browse products, add them to their cart, make purchases, and view their shopping history. The platform also includes admin and marketing dashboards for managing users and creating marketing posts.

## Features

### User Features
- **Product Browsing**: Explore products by categories.
- **Product Details**: View detailed information about each product.
- **Shopping Cart**: Add products to the cart and proceed to checkout.
- **Order History**: View past purchases in the shopping history.
- **User Authentication**: Login and register functionality.

### Admin Features
- **User Management**: Add, update, and delete users.
- **Role Management**: Assign roles (e.g., admin, marketing) to users.

### Marketing Features
- **Post Creation**: Marketing users can create, hide, or delete posts.
- **Post Management**: View all posts and manage their visibility.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database and authentication)
- **State Management**: React Hooks
- **Routing**: React Router

## Project Structure

```
Verkkokauppa/
├── src/          
│   ├── components/                # Reusable UI components                                              
│   │   ├── Header.jsx             # Header component
│   │   ├── Footer.jsx             # Footer component
│   │   ├── Product.jsx            # Product card component
│   │   ├── MarketingPost.jsx      # Marketing post creation and management
│   │   ├── Posts.jsx              # Display posts
│   │   ├── CheckoutForm.jsx       # Checkout form component
│   ├── pages/                     # Page components for routing
│   │   ├── Home.jsx               # Home page
│   │   ├── ProductPage.jsx        # Product details page
│   │   ├── Cart.jsx               # Shopping cart page
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── ShoppingHistory.jsx    # User shopping history page
│   │   ├── AdminDashboard.jsx     # Admin dashboard for user and role management
│   ├── supabaseClient.js          # Supabase client configuration
│   ├── App.jsx                    # Main application component
├── public/                        # Static assets (images, etc.)
├── .env                           # Environment variables
├── package.json                   # Project dependencies and scripts
├── README.md                      # Project documentation

```


1. Clone project
Git clone https://github.com/Lorzweq/ebayzalando.git

3. Install dependencies:
npm install

4. Set up environment variables:
Create a .env file in the root directory and add supabase api's

6. Start the development server:
npm run dev

7. Open the app in your browser:
http://localhost:5173

## Usage

### User

    Browse products and add them to the cart.
    Proceed to checkout and view order history.


### Admin

    Manage users and assign roles via the Admin Dashboard.


### Marketing

    Create, hide, or delete marketing posts via the Marketing Dashboard.


# Database Schema

## Tables

### 1.users

- id: UUID
- email: User email
- password: User password (hashed)
- role: User role (e.g., admin, marketing, user)

### 2.products

- id: Product ID
- name: Product name
- description: Product description
- price: Product price
- image_url: URL of the product image
- category: Product category
- stock: Stock quantity

### 3.shopping_history

- id: Order ID
- user_id: User ID
- product_name: Name of the purchased product
- price: Price of the product
- amount: Quantity purchased
- created_at: Timestamp of the purchase

### 4.posts

- id: Post ID
- title: Post title
- content: Post content
- image_url: URL of the post image
- hidden: Boolean to indicate if the post is hidden
- created_at: Timestamp of the post creation
