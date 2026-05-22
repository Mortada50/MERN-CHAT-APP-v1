# MERN Chat App v1

A real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js). The project demonstrates a full-stack, modern chat platform supporting authentication, real-time messaging with Socket.IO, and responsive design.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo

<!-- If deployed, add your link below: -->
[Live Demo](https://your-chat-app-demo-link.com)

---

## Features

- **User Authentication:** Register & login with JWT-based authentication.
- **Real-Time Messaging:** Instant one-to-one and group chat powered by Socket.IO.
- **Responsive UI:** Optimized for mobile, tablet, and desktop.
- **Message History:** Stores chat messages and user information in MongoDB.
- **Search Functionality:** Find users or messages quickly.
- **Modern React UI:** Built with React hooks and component-based structure.
- **Notifications:** Get real-time notifications on new messages.

---

## Screenshots

<!-- Include images in ./screenshots or a public path if available -->

| Login Page     | Chat Room         | Group Chat        |
| -------------- | ---------------- | ---------------- |
| ![login](./screenshots/login.png) | ![chat](./screenshots/chat.png) | ![group-chat](./screenshots/group-chat.png) |

---

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm or yarn
- MongoDB (local or cloud Atlas)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/Mortada50/MERN-CHAT-APP-v1.git
    cd MERN-CHAT-APP-v1
    ```

2. **Install dependencies**

    **For the backend:**
    ```bash
    cd server
    npm install
    ```

    **For the frontend:**
    ```bash
    cd ../client
    npm install
    ```

3. **Configure Environment Variables**

    - In both `/server` and `/client`, create a `.env` file based on sample files if present, and update the following:

    **Server `.env` example:**
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/mernchat
    JWT_SECRET=your_jwt_secret
    CLIENT_URL=http://localhost:3000
    ```

    **Client `.env` example:**
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

4. **Run the Application**

    **Start the backend:**
    ```bash
    cd server
    npm run dev
    ```

    **Start the frontend:**
    ```bash
    cd client
    npm start
    ```

    - The app should now be running at [http://localhost:3000](http://localhost:3000)

---

## Technologies Used

- **Frontend:** React, Context API, CSS/SASS/Tailwind (update as needed), Axios, Socket.IO-client
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Socket.IO
- **Dev Tools:** nodemon, concurrently, dotenv

---

## Project Structure

```
MERN-CHAT-APP-v1/
  client/          # React frontend
  server/          # Express backend
  README.md
  ...
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Contact

Created by [Mohamed Mortada](https://github.com/Mortada50) — feel free to get in touch!
