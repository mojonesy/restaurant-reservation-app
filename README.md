# Periodic Tables - Restaurant Reservation System
"Periodic Tables" is my final capstone project in [Thinkful's](https://www.thinkful.com/bootcamp/web-development/) online Software Engineering program. 
It is a full-stack web application intended to assist restaurant management in booking, seating, editing, and searching for reservations.
This final project was an opportunity for me to combine all the skills I've learned throughout my studies to create a fully functioning and aesthetically pleasing
program, using clean, effective, DRY code.

I implemented 8 user features using both inside-out and outside-in TDD, depending on the user story's function. 
Each user story was created as an individual branch before merging. You can view the instructions for each feature [here](capstone_instructions.md).
All user storys involved front and back-end testing, appropriate error-handling, and routes and middleware. I created and ran migrations using Knex to set up
a database and seeded it accordingly. ```cors``` is implemented in the backend.

### Check it out!
I deployed both the server and client of this monorepo on Heroku - you can view and test it out [here!](https://periodic-tables-mj-client.herokuapp.com/dashboard)

## Languages & Frameworks used:
- [React](https://github.com/facebook/create-react-app) & React Router
- JavaScript
- CSS
- [Bootstrap CSS](https://github.com/twbs/bootstrap)
- Node.js
- Express.js
- Knex.js
- PostgreSQL with Elephant SQL

## Features
### Dashboard (Home Page)
The Dashboard is the home page of the application, displaying side-bar navigation links, the current day's reservations, a button toolbar, and tables.
If there are no reservations on the current day, a message displays "No reservations on this date."
#### Reservations
Each reservation card displays a customer's reservation information. If a reservation is finished for that day, it is not shown on the dashboard.
The footer of each card contains a button leading to the "Seat" page (```/reservations/:reservation_id/seat```), a reservation status badge, and a "Cancel" button.

![Dashboard](screenshots/dashboard.png "Dashboard")
