# Eazy Event

## Overview

Welcome to **Eazy Event**, a full-stack application built with React, Node.js, Express, and MySQL. This application allows users to register, login, create and manage events, and register for events. It also includes a task management system for events.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## Features

- User registration and authentication
- Event creation and management
- Event registration
- Task management for events
- Responsive design

## Tech Stack

- **Frontend**: React, Axios, React Router, Tailwind CSS, Material UI, Formik
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Clerk(User Management Platform)
- **Environment Management**: dotenv

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16.x or later)
- npm (v6.x or later) or yarn
- MongoDB

## Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/akashyap25/Eazy_Event.git
    ```

2. **Backend Setup**

    Navigate to the backend directory and install dependencies:
    ```sh
    cd server
    npm install
    ```

    Create a `.env` file in the backend directory and add the following:
    ```env
    //MOngoDB
    MONGO_URI=mongodb+srv://
    //CLerk
    CLERK_PUBLISHABLE_KEY=pk_test_
    CLERK_SECRET_KEY=sk_test_
    CLERK_WEBHOOK_SECRET_KEY=whsec_
    //Port
    SERVER_BASE_URL=http://localhost:5000
    CLIENT_BASE_URL=http://localhost:5173
    //Stripe
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=
    //NodeMailer
    EMAIL_USER=
    EMAIL_PASS=
    ```

    Run the backend server:
    ```sh
    npm run start
    ```

3. **Frontend Setup**

    Navigate to the frontend directory and install dependencies:
    ```sh
    npm install
    ```

    Create a `.env` file in the frontend directory and add the following:
    ```env
    REACT_APP_HOST=http://localhost:3000
    ```

    Run the frontend development server:
    ```sh
    npm run start
    ```



## API Endpoints

- **User Authentication**
    - `POST /register` - Register a new user
    - `POST /login` - Login a user

- **Events**
    - `GET /events` - Get all events
    - `POST /events` - Create a new event
    - `GET /events/:id` - Get event by ID
    - `PUT /events/:id` - Update event by ID
    - `DELETE /events/:id` - Delete event by ID

- **Categories**
    - `GET /categories` - Get all categories
    - `POST /categories` - Create a new category

- **Event Registrations**
    - `POST /eventRegistrations` - Register for an event

- **Tasks**
    - `GET /tasks` - Get all tasks
    - `POST /tasks` - Create a new task
    - `PUT /tasks/:id` - Update task by ID
    - `DELETE /tasks/:id` - Delete task by ID

## Screenshots

### Home page
![Home Page](https://drive.google.com/file/d/1AheU7_Hpg_7IYi2AI-ycJySScDgvSz3Z/view?usp=sharing)
![Home Page](https://drive.google.com/file/d/1hZutI2AjiutHxVJuAmhOuA3rQ0n_N4np/view?usp=sharing)

### Registration Page
![Registration Page](https://drive.google.com/file/d/1WteBfwpHMXAdyHx3JqNgVlHC8AgIIQ6y/view?usp=drive_link)

### Login Page
![Login Page](https://drive.google.com/file/d/1_p6ChU4iYmgQJt7RwTPd8kE-x_7yxE7J/view?usp=sharing)

### Event Management
![Event Management](https://drive.google.com/file/d/1DA0k_ZtStlToqs0LSvAlVPdoDfwWgsc4/view?usp=sharing)

### Event Registration
![Event Registration](https://drive.google.com/file/d/1DO74rRIp--OXbXr5n-YfHcHaUx5-yv_k/view?usp=sharing)

### Task Management
![Task Management](https://drive.google.com/file/d/1kd4Dl66apz4vY1DU8xi4tcTfR3Iua7gR/view?usp=sharing)

## Contact

Anurag kumar - [anuragkashyap026@gmail.com](mailto:anuragkashyap026@gmail.com)

