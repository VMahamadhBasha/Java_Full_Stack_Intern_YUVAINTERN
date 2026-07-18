# Week 5: Database Integration with MongoDB & Mongoose

## Objective
Connect the Node.js/Express.js backend server with a NoSQL database (MongoDB) using the Mongoose Object Data Modeling (ODM) library. Create validation schemas and persist data.

## Learning Outcomes
*   Understood NoSQL document storage models vs. relational databases.
*   Connected Express to MongoDB locally using standard connection handlers.
*   Designed a structured validation schema definition for Contact inquiries (requiring name, valid email structure, message strings, and automatic timestamp tracking).
*   Handled asynchronous CRUD operations using `async/await` and robust try-catch blocks.

## Folder Deliverables
- `config/db.js`: Database connector module using Mongoose.
- `models/Contact.js`: Data model Schema defining validations for inquiries.
- `server.js`: Connects to database on launch and saves dynamic API submissions.
- `package.json`: NPM package manifest including `mongoose` and `dotenv`.
- `.env`: System credentials configurations.

## How to Test
1. Make sure you have a local instance of MongoDB running (e.g. via MongoDB Community Server on port `27017`).
2. Run `npm install` inside this folder.
3. Launch the server using `npm start`.
4. Submit a mock JSON payload to `http://localhost:5000/api/contact` using Postman, curl, or equivalent tools, and verify data persists inside the database.
