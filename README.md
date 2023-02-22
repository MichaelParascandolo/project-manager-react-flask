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
