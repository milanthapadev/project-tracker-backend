# Project Tracker Backend

A RESTful API for the Project Tracker application built with Express.js and MongoDB.

## Features

- **Project Management**
  - CRUD operations for projects
  - Project status tracking
  - Project description handling
  - Task count tracking

- **Task Management**
  - CRUD operations for tasks
  - Task status tracking
  - Task description handling
  - Project-task relationship management

- **API Features**
  - RESTful endpoints
  - Error handling
  - Data validation
  - CORS support
  - MongoDB integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Validation**: Express Validator
- **CORS**: cors middleware

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Setup Steps

1. **Prerequisites**
   - Node.js (v18 or later)
   - MongoDB (local or Atlas)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd backend

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/project-tracker
   PORT=5000
   NODE_ENV=development
   ```

4. **Development**
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
backend/
├── models/           # MongoDB models
│   ├── Project.js
│   └── Task.js
├── routes/          # API routes
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── server.js        # Express server setup
└── .env            # Environment variables
```

## Database Schema

### Project
```javascript
{
  title: String,
  description: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String,
  description: String,
  status: String,
  projectId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Database errors
- Validation errors
- Not found resources

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 