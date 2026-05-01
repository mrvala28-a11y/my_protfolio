# Vivek Vala's Portfolio

A modern, high-quality, fully responsive personal portfolio website built with React, Vite, Tailwind CSS, Framer Motion, and Node.js + Express.

## Project Structure
- `client/` - React + Vite frontend application.
- `server/` - Node.js + Express backend API.

## How to Run

### 1. Start the Backend Server
Open a terminal and run the following commands:
```bash
cd server
npm start
```
*(If `npm start` is not configured, run `node server.js`)*
The server will run on `http://localhost:5000`.

### 2. Start the Frontend App
Open a second terminal and run the following commands:
```bash
cd client
npm run dev
```
The React application will be available at `http://localhost:5173` (or the port Vite provides).

## Features
- **Intro Loader**: Smooth counting 0-100 with progress bar.
- **Glassmorphism Navbar**: Floating transparent sticky navigation.
- **Custom Cursor**: Interactive animated cursor.
- **Framer Motion Animations**: Scroll-based reveals and hover effects.
- **Responsive Design**: Works flawlessly on Mobile, Tablet, and Desktop.
- **Backend Integration**: Functional Contact form with toast notifications.
