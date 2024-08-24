# Pin'n Grab - Job Listing and Management Application

Pin'n Grab is a comprehensive web application for job listing and management. It allows users to post jobs, search for jobs, apply to jobs, and communicate with other users.

## Features

- User authentication (sign up, sign in, sign out)
- Job posting and management
- Job search with filtering options
- User profiles
- Messaging system
- Job application system
- Saved jobs and applied jobs tracking

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios for API requests
  - React Router for navigation
- Backend:
  - Express.js (inferred)
  - MySQL or PostgreSQL database (inferred)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Backend server running (see separate backend documentation)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dev-alt/pin-n-grab.git
   ```

2. Navigate to the project directory:
   ```
   cd pin-n-grab
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_PROXY_URL=http://localhost:5000
   ```
   Replace the URL with your backend server URL.

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

- `src/`: Contains the source code for the React application
  - `components/`: Reusable React components
  - `pages/`: Main page components
  - `AuthContext.js`: Context for managing authentication state
  - `UnreadMessagesContext.js`: Context for managing unread messages

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App configuration

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
