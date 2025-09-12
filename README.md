Form Leads

A lead management application where users can submit, view, edit, and delete leads. The project is built with React (frontend) and Node.js + Express (backend).

Project Links

Frontend (Production): https://form-leads.vercel.app/

Backend (Production): https://form-leads-1.onrender.com

Repository: https://github.com/Lj-tech-2005/Form-leads-

Project Structure
Form-leads/
├── backend/         # Node.js + Express API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── package.json
│   └── ...
├── frontend/        # React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── package.json
└── README.md

Technologies Used

Frontend: React + Vite

Backend: Node.js + Express

Database: MongoDB (if used, add your connection string in .env)

Deployment: Vercel (frontend), Render (backend)

Setup Instructions
1. Clone Repository
git clone https://github.com/Lj-tech-2005/Form-leads-.git
cd Form-leads-

2. Install Dependencies

Install dependencies for both backend and frontend.

# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install



4. Run the Project Locally

Start backend:

cd backend
npm start


Backend runs on:
http://localhost:5000

Start frontend:

cd frontend
npm start


Frontend runs on:
http://localhost:5173

5. Deployment

Frontend: deployed on Vercel → https://form-leads.vercel.app/

Backend: deployed on Render → https://form-leads-1.onrender.com

Available Scripts

In backend:

npm start → Run server with Node.js.

npm run dev → Run server with Nodemon (if configured).

In frontend:

npm start → Start React app with Vite.

npm run build → Build React app for production.

How to Use

Open http://localhost:5173
 (or deployed frontend).

Submit a new lead using the form.

View the list of leads.

Edit or delete leads as required.

API requests are served by the backend (http://localhost:5000 in dev or https://form-leads-1.onrender.com in production).