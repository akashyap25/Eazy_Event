# Eazy Event

## Overview

Welcome to **Eazy Event**, a full-stack event management application built with modern web technologies. This application provides a comprehensive platform for creating, managing, and attending events with advanced features like task management, payment processing, and real-time updates.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - Secure login/registration with Clerk
- **Event Management** - Create, update, delete, and manage events
- **Event Registration** - Users can register for events with payment processing
- **Task Management** - Assign and track tasks for events
- **Payment Processing** - Integrated Stripe payment system
- **Real-time Updates** - Live notifications and updates
- **Responsive Design** - Mobile-first, responsive UI

### Advanced Features
- **Image Upload** - Cloudinary integration for event images
- **Search & Filtering** - Advanced event search and filtering
- **Category Management** - Organize events by categories
- **User Profiles** - Comprehensive user profile management
- **Email Notifications** - Automated email notifications
- **Error Handling** - Comprehensive error handling and logging
- **Security** - Rate limiting, input validation, and security headers

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **React Router** - Client-side routing
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client
- **Clerk** - Authentication service
- **Stripe** - Payment processing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens
- **Joi** - Data validation
- **Winston** - Logging library
- **Helmet** - Security middleware
- **Rate Limiting** - API rate limiting

### DevOps & Tools
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v18.x or later)
- **npm** (v9.x or later) or **yarn**
- **MongoDB Atlas** account or local MongoDB instance
- **Clerk** account for authentication
- **Stripe** account for payments
- **Cloudinary** account for image storage

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/akashyap25/Eazy_Event.git
cd Eazy_Event
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd eazy_event_server
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development
SERVER_BASE_URL=http://localhost:5000
CLIENT_BASE_URL=http://localhost:5173

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
CLERK_WEBHOOK_SECRET_KEY=whsec_your_webhook_secret_here

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Security
JWT_SECRET=your_jwt_secret_here
BCRYPT_ROUNDS=12
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd Eazy_Event
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
# Frontend Environment Variables
VITE_SERVER_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

Start the frontend development server:
```bash
npm run dev
```

## 🧪 Testing

Run tests for the backend:
```bash
cd eazy_event_server
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 📚 API Documentation

### Authentication
All protected routes require authentication via Clerk.

### Events API
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events/create` - Create new event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `GET /api/events/user/:id` - Get user's events (protected)

### Users API
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:clerkId` - Update user
- `DELETE /api/users/:clerkId` - Delete user

## 🔒 Security Features

- **Authentication** - Clerk-based authentication
- **Authorization** - Role-based access control
- **Input Validation** - Joi schema validation
- **Rate Limiting** - API rate limiting
- **Security Headers** - Helmet.js security headers
- **CORS** - Configured CORS policy
- **Error Handling** - Comprehensive error handling

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 📱 Screenshots

### Home Page
![Home Page](https://drive.google.com/file/d/1AheU7_Hpg_7IYi2AI-ycJySScDgvSz3Z/view?usp=sharing)

### Event Management
![Event Management](https://drive.google.com/file/d/1DA0k_ZtStlToqs0LSvAlVPdoDfwWgsc4/view?usp=sharing)

### Task Management
![Task Management](https://drive.google.com/file/d/1kd4Dl66apz4vY1DU8xi4tcTfR3Iua7gR/view?usp=sharing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anurag Kumar** - [anuragkashyap026@gmail.com](mailto:anuragkashyap026@gmail.com)

## 🙏 Acknowledgments

- Clerk for authentication services
- Stripe for payment processing
- Cloudinary for image storage
- Material-UI for UI components
- All contributors and users

