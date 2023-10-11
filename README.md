# Firebasecrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Prerequisites
Before you proceed, make sure you have the following installed:

1. Node.js
2. Angular CLI
3. Firebase account and project (with Firestore enabled)

## Getting Started
1. Clone this repository or create a new Angular project.

2. Install project dependencies using npm:
   npm install
3. Set up your Firebase configuration in src/environments/environment.ts. Replace the Firebase configuration object with your own Firebase project configuration
4. Run the application using the Angular CLI:
    ng serve

   
## Application Overview

This Angular application provides a user interface to interact with the Firebase Firestore database. Here's an overview of the key features and components:

**Add Employee Form:** You can add employee details, including their name, email, and date of birth.

**View Employee List:** Click the "View Employee List" button to see a list of employees in a table format. You can update and delete employee records from this list.

**Real-time Updates:** The application uses Firebase Realtime updates to keep the employee list synchronized with changes made in the Firestore database.

## FirebaseService

The FirebaseService in the firebase.service.ts file is responsible for interacting with Firebase Firestore. It provides methods to add, retrieve, update, and delete employee records in Firestore.

## Additional Dependencies

This application relies on the following dependencies:

**firebase:** The Firebase JavaScript SDK for interacting with Firestore.
**angular/material:** The Angular Material library for UI components.
**jquery and datatables.net:** Used for data table rendering.


## Usage
Access the application in your web browser at http://localhost:4200/.

Use the application to add, view, update, and delete employee records in the Firestore database.

Real-time updates will automatically reflect changes made by other users.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
