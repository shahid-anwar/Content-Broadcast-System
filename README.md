# Content Broadcasting System

A role-based content broadcasting platform built using React.js and Tailwind CSS.

The application simulates a real-world workflow where:

* Teachers upload learning content
* Principals approve or reject uploaded content
* Students view approved live content

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* React Hook Form
* Zod Validation
* React Hot Toast
* Lucide React Icons

## State Management

* Local Storage (for assignment/demo purposes)

---

# Features

## Authentication

* Role-based login system
* Teacher Login
* Principal Login
* Student Login

## Teacher Dashboard

* Upload content
* Upload image preview
* Schedule content timings
* View uploaded content
* Track approval status

## Principal Dashboard

* View pending approvals
* Approve content
* Reject content
* View all uploaded content

## Student Live Page

* View approved live content
* Dynamic content rendering
* Auto refresh functionality
* Responsive content cards

## UI/UX

* Fully responsive design
* Modern dashboard layout
* Collapsible sidebar
* Skeleton loaders
* Toast notifications
* Clean card-based UI

---

# Demo Credentials

## Teacher

Email: [teacher@gmail.com](mailto:teacher@gmail.com)
Password: 123456

## Principal

Email: [principal@gmail.com](mailto:principal@gmail.com)
Password: 123456

## Student

Email: [student@gmail.com](mailto:student@gmail.com)
Password: 123456

---

# Project Structure

```bash
src/
│
├── components/
│   ├── common/
│   └── layout/
│
├── pages/
│   ├── auth/
│   ├── teacher/
│   ├── principal/
│   └── public/
│
├── routes/
├── services/
├── layouts/
└── utils/
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

## Navigate to Project

```bash
cd content-broadcast-system
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# Build for Production

```bash
npm run build
```

---


# Validation

The project uses:

* React Hook Form for form handling
* Zod for schema-based validation

Example validations:

* Required title and subject
* Start time validation
* End time must be after start time

---

# Future Improvements

* Backend Integration
* JWT Authentication
* Cloud Image Upload
* Database Persistence
* Redux/Zustand State Management
* Role-based Protected Routes
* Dashboard Analytics
* Search & Filters
* Pagination
* Real-time Socket Updates

---

# Assignment Highlights

* Dynamic role-based workflow
* LocalStorage persistence
* Approval-based content visibility
* Responsive modern UI
* Reusable component structure
* Form validation architecture
* Clean frontend project organization

---

# Author

Shahid Anwar Ansari
