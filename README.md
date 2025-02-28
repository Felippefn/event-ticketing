# 🎟 Event Ticketing System

An **event ticketing** system built with **Node.js**, **Express**, and **MongoDB** that allows users to purchase event tickets and generate QR codes for verification.

---

## 🚀 Features

✅ **User Authentication** (Middleware-protected routes)  
✅ **Purchase Tickets** with API endpoints  
✅ **Generate QR Codes** for ticket validation  
✅ **Express-based REST API** for easy integration  
✅ **MongoDB Database** for storing ticket & event details  

---

## 📂 Project Structure

```
event-ticketing/
│── controllers/         # Contains business logic (purchaseTicket, etc.)
│── middleware/          # Middleware (authMiddleware for authentication)
│── models/              # Database models (User, Ticket, Event)
│── routes/              # Express routes (API endpoints)
│── server.js            # Main entry point for the backend server
│── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/event-ticketing.git
cd event-ticketing
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Setup environment variables  
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/ticketing
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the server
```sh
npm start
```
Your backend will be running on **http://localhost:5000**.

---

## 🔗 API Endpoints

### **User Authentication**
| Method | Endpoint         | Description               |
|--------|----------------|---------------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get token |

### **Ticket Management**
| Method | Endpoint                        | Description                |
|--------|---------------------------------|----------------------------|
| POST   | `/api/tickets/generate-qrcode` | Generate ticket QR code    |

---

## 🔨 Example Routes

### **User Registration**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
Response:
```json
{
  "message": "User registered successfully",
  "token": "your_jwt_token"
}
```

### **Generate Ticket QR Code**
```json
POST /api/tickets/generate-qrcode
Headers: { "Authorization": "Bearer your_jwt_token" }
Body:
{
  "event_id": "64bcd56f1a23bc9c",
  "user_id": "64acd23f45fcd123"
}
```
Response:
```json
{
  "ticket_id": "64dd123f4bcd8912",
  "qr_code": "qrcode_link_here"
}
```

---

## 🐛 Debugging Tips

- **Issue: `Cannot read properties of undefined (reading 'id')`**  
  ✅ Solution: Ensure `express.json()` is used in `server.js`:  
  ```js
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  ```

- **Issue: API request body is empty**  
  ✅ Solution: Check if the request is sent with `Content-Type: application/json`.  

---

## 🏗 Future Enhancements

🔹 **Stripe Payment Integration** for ticket purchases  
🔹 **User Dashboard** to manage booked tickets  
🔹 **Admin Panel** for event management  

---

## 🤝 Contributing

Feel free to submit **issues**, **pull requests**, or **feature requests**.

---

## 📜 License

This project is licensed under the **MIT License**.

---

🎉 **Happy coding!** Let me know if you have any issues!
