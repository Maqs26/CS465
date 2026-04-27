# Travlr Getaways

## Overview
Travlr Getaways is a full stack web application built using the MEAN stack (MongoDB, Express, Angular, and Node.js). The app includes a customer-facing site where users can browse trips and an admin interface where trips can be created, updated, and deleted. The admin side is built as a single page application, which makes it faster and easier to manage data without reloading pages.

---

## Architecture

The frontend uses both a traditional Express setup and an Angular single page application. The Express side serves full HTML pages and is mainly used for the customer-facing portion. The Angular SPA is used for the admin side and allows the interface to update dynamically without refreshing the page.

The SPA provides a smoother and more responsive experience, while the Express frontend is simpler and works well for basic navigation and viewing content.

MongoDB was used as the database because it stores data in a flexible JSON-like format, which works well with JavaScript. It also makes it easier to adjust the data structure as the project grows compared to a relational database.

---

## Functionality

JSON is used to pass data between the frontend and backend. It is not a programming language such as JavaScript, but a format for organizing and sending data. In this project, Angular sends HTTP requests to the Express API and receives JSON responses, which are then used to update the UI.

During development, I refactored parts of the code to make things more efficient and easier to manage. I created reusable Angular components like trip cards and forms so the same UI elements could be used in multiple places. I also used services to handle API calls in one place instead of repeating code. This made the project more organized and easier to maintain.

---

## Testing

Testing focused on making sure the API endpoints worked correctly and that data was being sent and received as expected. I used tools like Postman and browser developer tools to test GET, POST, and PUT requests.

For example, I tested endpoints like `/api/trips` to make sure trip data could be retrieved and updated in the database. Adding authentication made testing more challenging because requests required a valid token. I had to make sure headers were set correctly and that only authorized users could access certain routes.

This process helped me understand how HTTP methods, API endpoints, and security features all work together in a full stack application.

---

## Reflection

This course helped me get a better understanding of how a full stack application actually works from start to finish. I worked with Angular, Express, and MongoDB and learned how to connect everything together.

I also ran into real issues like CORS errors, authentication problems, and data not flowing correctly between the frontend and backend. Working through those problems helped me get more comfortable debugging and figuring out where things were breaking.

I feel a lot more confident now working with APIs, structuring projects, and building applications that have both a frontend and backend.
