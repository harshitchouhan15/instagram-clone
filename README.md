# Instagram Clone

Welcome to my Instagram clone project! This is a MERN (MongoDB, Express, React, Node.js) stack-based web application that replicates some of the key features of the original Instagram platform.

## Live Demo

Check out the live demo of this project: [Instagram Clone](https://instagram-clone-7d5d2735c8b3.herokuapp.com/)

## Features

- **User Authentication**: Users can sign up and log in securely using JWT (JSON Web Tokens).
- **Media Upload**: Upload and share your favorite photos with the community.
- **Like and Comment**: Interact with other users' posts by liking and commenting on them.
- **Responsive Design**: The website is fully responsive, ensuring a seamless experience across devices.
- **Real-Time Messaging**: Utilizes Socket.IO for real-time messaging between users.
- **Redux State Management**: Redux is used to manage the application's state efficiently.
- **Redux Persist**: Redux Persist is implemented to maintain state persistence across sessions.
- **Firebase CDN**: Firebase CDN is used for media storage, making it easy to handle images.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/harshitchouhan15/instagram-clone.git
   cd instagram-clone
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

2. Set up your environment variables:

Create a .env file in the server directory for your MongoDB connection URL and JWT secret.
Ensure you have the necessary Firebase credentials for media storage.

3. Run the development server:
   # From the 'root' directory
npm start

# From the 'client' directory
npm start

4. Open your browser and visit http://localhost:3000 to view the application.

   Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to your branch (git push origin feature/your-feature).
5. Open a pull request.


Feel free to customize this README file to include any additional information or sections you'd like.


