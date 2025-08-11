# Unified Identity – Migrant Connect

Unified Identity (Migrant Connect) is a full-stack web application designed to help migrant workers manage their identity and access essential services such as healthcare, education, financial services, and social welfare. The platform enables users to register, securely store their information, and access or update their records with ease.

---

## Features

- **User Registration & Login:** Migrants can register and log in using a unique Migrant ID.
- **Dashboard:** Access a personalized dashboard with quick links to all services.
- **Healthcare Records:** View and filter healthcare visits and treatments.
- **Education Records:** Add, view, and download education certificates. User-added records are marked as "User Added"; institution-verified records are marked as "Verified".
- **Financial Services:** View sample financial data such as bank account, balance, and subsidies.
- **Social Welfare:** View sample welfare data such as ration card and benefit schemes.
- **QR Code Support:** Generate and download a QR code for Migrant ID; recover ID via QR scanning.
- **Multi-language Support:** English, Hindi, and Bengali.
- **Responsive UI:** Built with React and Tailwind CSS for a modern, mobile-friendly experience.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** JWT for authentication, dotenv for environment variables

---

## Project Structure

```
/frontend
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── i18n.js
  │   └── App.jsx
  └── ...
/backend
  ├── models/
  ├── routes/
  ├── controllers/
  ├── server.js
  └── .env
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas or local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/unified-identity.git
cd unified-identity
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with the following:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```

- Start the backend server:
  ```bash
  node server.js
  ```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

- The frontend will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## Usage

1. **Register:** Sign up as a migrant worker and receive a unique Migrant ID and QR code.
2. **Login:** Use your Migrant ID to log in.
3. **Dashboard:** Access services like Healthcare, Education, Financial, and Welfare.
4. **Add/View Records:** Add new education records, view healthcare visits, and see sample financial/welfare data.
5. **Download Certificates:** Download education certificates as files.
6. **Multi-language:** Switch between English, Hindi, and Bengali.

---

## Customization

- **Languages:** Add more translations in `frontend/src/i18n.js`.
- **Services:** Extend or modify service pages in `frontend/src/pages/services/`.
- **Backend Logic:** Update models and routes in `/backend` as needed.

---

## Security Notes

- JWT secret and MongoDB credentials should be stored securely (use `.env`).
- For production, review and enhance authentication and authorization.

---

## License

This project is for educational and demonstration purposes.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)

---

**Made with ❤️ for migrant empowerment.**