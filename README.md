# Periodic Tables - Restaurant Reservation System
"Periodic Tables" is my final capstone project in [Thinkful's](https://www.thinkful.com/bootcamp/web-development/) online Software Engineering program. 
It is a full-stack web application intended to assist restaurant management in booking, seating, editing, and searching for reservations.
This final project was an opportunity for me to combine all the skills I've learned throughout my studies to create a fully functioning and aesthetically pleasing
program using clean, effective, DRY code.

I implemented 8 user features using both inside-out and outside-in TDD, depending on the user story's function. 
Each user story was created as an individual branch before merging. You can view the instructions for each feature [here](capstone_instructions.md).
All user stories involved front and back-end testing, appropriate error-handling, and routes and middleware. I created and ran migrations using Knex to set up
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
#### Tables
Each table card displays the table name, a capacity badge, and status. Default status is green for "free," and displays in yellow when "occupied."

![Dashboard](screenshots/dashboard.png "Dashboard")

### Create a Reservation
The "New Reservation" page (```/reservations/new```) allows the user to create a new reservation. Input fields include first/last name, mobile number, date, time, and number of guests. Each field has validations in the form component as well as in the back-end, and will display an error message in red at the top of the page for any violations. Clicking "Cancel" returns to the previous page, while clicking "Submit" creates the reservation and displays it on the dashboard on it's given reservation day.

![Create Reservation](screenshots/new_reservation.png "Create a new reservation")

### Search
The "Search" page allows the user to search for an existing reservation by mobile number. Search input can be any combination or length of numbers.
Clicking "Find" will display all existing reservations with a mobile number that includes the given combination of numbers, and "No reservations found" otherwise.

![Reservation Search](screenshots/search_screen.png "Reservation search")

### Create a New Table
The "New Table" page allows the user to create a new table for the restaurant. Input fields include the table name (such as "Hi-top #4" or "Patio #2") and the table capacity, which must be a number between 1 and 8. Appropriate validation is included in the front and back-end as well as error messages.
Clicking "Cancel" returns to the previous page, while "Submit" creates the table and adds it to the tables list on the Dashboard.

![New Table](screenshots/new_table.png "New Table")
