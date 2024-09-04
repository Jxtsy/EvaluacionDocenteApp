# Evaluations App

This project is a mobile application built with Ionic that provides a platform for managing evaluations. The app includes features for user authentication, viewing teachers, managing votes, displaying charts, and handling evaluations.

## Features

- **Login**: User authentication and login functionality.
- **Teacher List**: Displays a list of teachers.
- **Votes Management**: Allows users to manage and submit votes.
- **Chart**: Visualizes evaluation results with graphical charts.
- **Evaluations**: Handles the creation and management of evaluations.

## Project Structure

- `src/app/pages/login`: Manages user authentication and login functionality.
- `src/app/pages/teacher`: Displays and manages the list of teachers.
- `src/app/pages/votes`: Handles voting functionality and vote management.
- `src/app/pages/chart`: Generates and displays graphical charts of evaluation results.
- `src/app/pages/evaluations`: Manages the creation, listing, and details of evaluations.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [Ionic CLI](https://ionicframework.com/docs/intro/cli) (install using `npm install -g @ionic/cli`)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <REPOSITORY_URL>
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd <PROJECT_DIRECTORY>
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

## Running the Application

1. **Start the Ionic Development Server:**
   ```bash
   ionic serve
   ```

   This will open the application in your default web browser.

2. **To Build for Mobile Platforms:**

   - **Android:**
     ```bash
     ionic cordova build android
     ```

   - **iOS:**
     ```bash
     ionic cordova build ios
     ```

   Ensure you have the necessary SDKs and development tools installed for building mobile apps.

## Configuration

- **Environment Variables**: Configure environment-specific settings in `src/environments`. This may include API endpoints and other configurations.
