# Prerequisites

### Install on your machine

- Node js
- Git
- Yarn
- Python

# Getting Started

### You will need to open and run two terminal windows simultaneously, one to run the frontend, and one for the backend.

# Starting Backend

https://flask.palletsprojects.com/en/2.2.x/installation/#install-flask For Reference
https://www.postman.com/downloads/ Not required but useful for testing the API

## For Mac

### In the terminal

- cd backend
  - Where all flask files are stored
- python3 -m venv venv
  - Creates python virtual environment, if you already have a venv/env folder you can skip this command.
- . venv/bin/activate
  - Activates Python virtual environment
- pip install -r requirements.txt
  - Downloads all required dependencies, if you have already ran this command previously, you can skip this.
- flask run
  - Starts Flask

## For Windows

### In the terminal

- cd backend
  - Where all flask files are stored
- py -3 -m venv venv
  - Creates python virtual environment, if you already have a venv/env folder you can skip this command.
- venv\Scripts\activate
  - Activates Python virtual environment
- pip install -r requirements.txt
  - Downloads all required dependencies, if you have already ran this command previously, you can skip this.
- flask run
  - Starts Flask.

# Starting Frontend

## For Mac/Windows

### Make sure your terminal is in the main project directory

- yarn dev
  - Starts the frontend.
- If you get an error saying you are missing dependencies simply run "yarn" in the terminal.

# User Manual

[User Manual](./documents/UserManual.pdf)

This manual is specifically designed for the use of Quality Electric Service
employees. It will help you maintain, organize, and keep detailed records. In
this manual you’ll find screenshots, explanations, and instructions on how to
properly use the system.

# Application Screenshots

## Admin Account / General Screenshots

### Login

![Signin](./documents/screenshots/signin.png)

### Password Reset

![Signin](./documents/screenshots/reset.png)

### Home (Admin)

![Signin](./documents/screenshots/admin-home.png)

### Team / Accounts (Admin)

![Signin](./documents/screenshots/team.png)

### Register (Admin)

![Signin](./documents/screenshots/team-add.png)

### Clients Page

![Signin](./documents/screenshots/clients.png)

### Clients List (Admin)

![Signin](./documents/screenshots/client-list.png)

### Client Job History (Admin)

![Signin](./documents/screenshots/client-history.png)

### Job Schedule (Admin)

![Signin](./documents/screenshots/schedule-admin.png)

### Schedule Search

![Signin](./documents/screenshots/schedule-search.png)

### Schedule Edit

![Signin](./documents/screenshots/schedule-edit.png)

## User Account Screenshots

### Home (User)

![Signin](./documents/screenshots/user/user-home.png)

### Team / Accounts (Admin Only)

![Signin](./documents/screenshots/user/team-user.png)

### Client Job History (User)

![Signin](./documents/screenshots/user/clients-list.png)

### Client Job History (User)

![Signin](./documents/screenshots/user/client-history-user.png)

### Job Schedule (User)

![Signin](./documents/screenshots/user/schedule-user.png)
