# Cross-Site Cookie Sharing POC

This project demonstrates cross-site cookie sharing using a basic API server and two client websites.

## Setup

### 1. Start the API Server

Run the following command in the project directory:

```bash
node api.js
```

The API server will be available at http://localhost:3000.

### 2. Start the Client Websites

Run the following command to start both client websites:

```bash
node client.js
```

- Site 1 will be available at http://localhost:3001.
- Site 2 will be available at http://localhost:3002.

## Usage

### On Site 1 (http://localhost:3001):

- Click "Call API" to set or increment the cookie.
- Click "Clear Cookie" to clear the cookie.

### On Site 2 (http://localhost:3002):

- Click "Call API" to send a request to the API server with cookies set by Site 1.

## Notes

- Ensure all servers are running on their respective ports.
- Check browser settings if cookies are not being sent.