# TaskBuddy — Full-Stack Task & Productivity Management Platform

TaskBuddy is a full-stack task and productivity management web application designed to help students and individuals organize, track, and complete their daily tasks efficiently.

The application provides task creation and management, priorities, statuses, due dates, search and filtering, dashboard statistics, and a dedicated completed-tasks view. Task data is persistently stored in PostgreSQL through Supabase and accessed through a REST API built with Node.js and Express.

## 🚀 Live Demo

**Live Application:** https://taskbuddy-steel.vercel.app

**Backend API Health:** https://taskbuddy-4rno.onrender.com/api/health

## 📂 Repository

**GitHub:** https://github.com/sunshriya-jeer/taskbuddy

---

## ✨ Features

* Create new tasks
* Edit existing tasks
* Delete tasks
* Track task status:

  * Pending
  * In Progress
  * Completed
* Set task priority:

  * Low
  * Medium
  * High
* Add task categories
* Set due dates
* Search tasks by title or description
* Filter tasks by status and priority
* Dashboard statistics
* Dedicated Completed Tasks section
* Responsive design for desktop and mobile
* Persistent database storage
* RESTful backend API
* Loading and error states
* Live production deployment

---

## 🖥️ Application Overview

### Dashboard

The dashboard provides an overview of tasks and productivity statistics, allowing users to quickly understand their current workload.

### Task Management

Users can create, update, and delete tasks with information such as:

* Title
* Description
* Category
* Priority
* Status
* Due date

### Completed Tasks

Completed tasks are automatically displayed in a dedicated section.

The section uses the task status stored in the database, so changing a task's status to `Completed` makes it appear in the Completed Tasks view.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + Vite        │
                    │ Frontend            │
                    │      Vercel         │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │ Backend             │
                    │      Render         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Supabase            │
                    │ PostgreSQL          │
                    │ Database            │
                    └─────────────────────┘
```

### Data Flow

```text
User Action
    ↓
React Frontend
    ↓
REST API Request
    ↓
Express Backend
    ↓
Supabase PostgreSQL
    ↓
API Response
    ↓
React UI Update
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* Responsive UI

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* Supabase
* PostgreSQL

### Development & Deployment

* Git
* GitHub
* Vercel
* Render
* ESLint

---

## 🔌 REST API

Base URL:

```text
https://taskbuddy-4rno.onrender.com/api
```

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/tasks`     | Get all tasks    |
| GET    | `/tasks/:id` | Get a task by ID |
| POST   | `/tasks`     | Create a task    |
| PUT    | `/tasks/:id` | Update a task    |
| DELETE | `/tasks/:id` | Delete a task    |

### Example Task Object

```json
{
  "title": "Complete TaskBuddy",
  "description": "Finish the full-stack TaskBuddy project",
  "priority": "High",
  "status": "Pending",
  "category": "College",
  "dueDate": "2026-10-10"
}
```

---

## 🗄️ Database

TaskBuddy uses a PostgreSQL database hosted through Supabase.

Each task contains information including:

* `id`
* `title`
* `description`
* `priority`
* `status`
* `category`
* `due_date`
* `created_at`
* `updated_at`

The database provides persistent storage, meaning tasks remain available after refreshing or reopening the application.

---

## 📁 Project Structure

```text
taskbuddy/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── CompletedTasks.jsx
│   │   ├── FilterBar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskForm.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── taskService.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.js
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   └── server.js
│   │
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/sunshriya-jeer/taskbuddy.git
cd taskbuddy
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure backend environment variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_secret_key
```

Never commit `.env` or expose secret keys publicly.

### 5. Start the backend

From the `backend` directory:

```bash
node src/server.js
```

The backend will run locally on:

```text
http://localhost:5000
```

### 6. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🧪 Testing

The project was tested across the main application flow:

* Task creation
* Task retrieval
* Task editing
* Task deletion
* Status changes
* Priority filtering
* Search functionality
* Completed Tasks filtering
* Database persistence
* API error handling
* Responsive UI
* Production build
* Live frontend-to-backend communication

Production build verification:

```bash
npm run build
```

ESLint verification:

```bash
npx eslint src
```

---

## 🔐 Security

Sensitive configuration values are stored using environment variables.

The following should never be committed to GitHub:

```text
.env
Supabase secret keys
API secrets
```

The backend uses environment variables for Supabase configuration, while the frontend communicates with the deployed REST API.

---

## 🌐 Deployment

### Frontend

Deployed using **Vercel**.

Live URL:

https://taskbuddy-steel.vercel.app

### Backend

Deployed using **Render**.

API:

https://taskbuddy-4rno.onrender.com

### Database

Hosted using **Supabase PostgreSQL**.

---

## 📚 What I Learned

Through this project, I worked with:

* React component-based development
* State management in React
* REST API integration
* Node.js and Express backend development
* CRUD operations
* PostgreSQL database integration
* Supabase
* API error handling
* Environment variables
* Git and GitHub workflows
* Frontend-backend integration
* Production deployment
* Debugging full-stack applications

---

## 🔮 Future Improvements

Potential future improvements include:

* User authentication and authorization
* Individual user task management
* Task reminders and notifications
* Recurring tasks
* Calendar integration
* Advanced productivity analytics
* Team collaboration
* Task sharing
* AI-assisted task prioritization

---

## 👩‍💻 Developer

**Sunshriya Jeer**

B.Tech — Electronics and Computer Engineering

Interested in:

* Software Development
* Full-Stack Development
* Problem Solving
* Artificial Intelligence
* Electronics & Computer Engineering

GitHub: https://github.com/sunshriya-jeer

LinkedIn: https://www.linkedin.com/in/sunshriya-jeer-2155a7385

---

## ⭐ Project Status

**Status: Completed and Deployed**

TaskBuddy is a fully functional full-stack application with a React frontend, Express REST API, Supabase PostgreSQL database, and live production deployment.
