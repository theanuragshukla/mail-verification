# Email Verification System

Email Verification System is a Node.js application using Express for handling HTTP requests, Mongoose for MongoDB database operations, and nodemailer for sending emails. The primary purpose of this application is to handle user email verification during registration.
## Table of Contents 
- [Introduction](#introduction) 
- [Features](#features) 
- [Requirements](#requirements) 
- [Installation](#installation) 
- [Configuration](#configuration) 
- [Usage](#usage) 
- [API Endpoints](#api-endpoints) 
## Introduction

This project provides a simple email verification system for user registration. It allows users to receive a verification email and verify their email address before gaining full access to the system.
## Features
- User registration with email verification.
- Checking email verification status.
- Verifying user's email address.
## Requirements
- Node.js
- npm (Node Package Manager)
- MongoDB
## Installation 
1. Clone the repository:

```bash
git clone https://github.com/theanuragshukla/mail-verification.git
``` 
2. Install dependencies:

```bash
cd mail-verification
npm install
```
## Configuration 
1. Create a `.env` file in the project root and add the following environment variables:

```env
PORT=3000
SERVER_URL=http://localhost:3000
EMAIL=your-email@gmail.com
PASSWORD=your-email-password
```

Replace `your-email@gmail.com` and `your-email-password` with the email and password you want to use for sending emails.


2. Modify other configurations in the code if needed.
## Usage

Start the server:

```bash
npm start
```



Your server will be running at [http://localhost:3000]() .
## API Endpoints 
1. **/** 
- Description: Check server status.
- Response: JSON indicating server status. 
2. **/send-mail** 
- Description: Send email for email verification. 
- Request Body:

```json
{
  "firebaseId": "your-firebase-id",
  "email": "user@example.com"
}
```
- Response: JSON indicating whether the email was sent successfully. 
3. **/check-status** 
- Description: Check email verification status. 
- Query Parameters: 
- `firebaseId`: Firebase ID 
- `email`: User's email
- Response: JSON indicating whether the user is verified. 
4. **/verify** 
- Description: Verify user's email. 
- Query Parameters: 
- `uid`: User ID
- Response: JSON indicating whether the email was successfully verified.
