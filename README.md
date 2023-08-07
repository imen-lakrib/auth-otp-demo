
```markdown
# Firebase OTP Authentication Demo

This repository contains a simple demonstration of OTP (One-Time Password) authentication using Firebase Authentication in a React application.

## Features

- User registration using email and password
- OTP authentication via SMS
- Secure authentication with Firebase Authentication

## Technologies Used

- React.js: A JavaScript library for building user interfaces
- Firebase: A platform for building web and mobile applications

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: https://nodejs.org/
- npm: Included with Node.js installation

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imen-lakrib/auth-otp-demo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd firebase-otp-auth-demo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a Firebase project and set up Firebase Authentication. Follow the official guide: [Getting Started with Firebase Authentication](https://firebase.google.com/docs/auth/web/start)

5. Configure Firebase credentials:
   - Rename the `src/firebase/config.example.js` file to `src/firebase/config.js`
   - Replace the placeholders in `config.js` with your Firebase project credentials

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the app in action.

## Usage

- Register a new user with an email and password.
- Log in using the registered credentials.
- Click the "Send OTP" button to initiate OTP authentication via SMS.
- Enter the received OTP to complete the authentication.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

