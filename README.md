# Student Dashbord

Vue.js application for managing student records with a clean  , responsive interface.


## Technologies Used

- Vue.js 3
- Bootstrap 5
- JSON Server for mock API

## Project Setup

```bash
# Install dependencies
npm install

# Start the mock API server (port 3001)
npx json-server --watch db.json --port 3001

# Run the development server
npm run serve
```

## API Structure

The application uses a REST API with the following endpoints:

- `GET /students` - Retrieve all students
- `POST /students` - Add a new student
- `DELETE /students/:id` - Delete a student

## Development

This project was created as part of a lab assignment to demonstrate CRUD operations with Vue.js course in iti.

## Author

Abdallah
