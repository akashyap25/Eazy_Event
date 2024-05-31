# Eazy Event

## Overview

Welcome to **Eazy Event**, a full-stack application built with React, Node.js, Express, and MySQL. This application allows users to register, login, create and manage events, and register for events. It also includes a task management system for events.

![Project Logo](https://drive.google.com/file/d/1hq-BR692LiwHluBbYRdjL4rNSEGvA4kk/view?usp=sharing)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User registration and authentication
- Event creation and management
- Event registration
- Task management for events
- Responsive design

## Tech Stack

- **Frontend**: React, Axios, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v12.x or later)
- npm (v6.x or later) or yarn
- MySQL (v5.7 or later)

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
    PORT=3000
    DB_HOST=your-db-host
    DB_USER=your-db-username
    DB_PASSWORD=your-db-password
    DB_NAME=your-db-name
    JWT_SECRET=your-jwt-secret
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

## Contributing

Contributions are always welcome! Please fork this repository and open a pull request to add new features or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Anurag kumar - [anuragkashyap026@gmail.com](mailto:anuragkashyap026@gmail.com)

Project Link: [https://github.com/akashyap25/Eazy_Event.git](https://github.com/akashyap25/Eazy_Event.git)
