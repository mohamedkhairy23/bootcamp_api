# dev_camper_api  
Documentation Link: https://documenter.getpostman.com/view/17269685/2s9YeLY9F6

Features:
Authentication using JWT and cookies and there are endpoints for: 
(Register user - Confirm email by sending confirmation email token (Nodemailer for sending confirmation emails) - 
Login a user - Logout a user - Get current logged-in user - Forgot Password - Reset password - Update Profile - Update password for logged-in user)

CRUD on user for an admin and there are endpoints for:
(Get all users - Get a single user - Create a user - Update a user - Delete a user)

- Authorization (Protect authorization - user roles and permissions)

Bootcamp Functionalities and there are endpoints for:
(Get all bootcamps - Get a single bootcamp - Create a new bootcamp - Update a bootcamp - Delete a bootcamp - Filter bootcamps within the distance (radius)).

Courses Functionalities and there are endpoints for:
(Get all courses - Get courses for a specific bootcamp by bootcampID - Get Single Course - Add a Course for a specific bootcamp by bootcampID - Update a Course - Delete a Course).

- Calculate the average cost of a Bootcamp by calculating the average cost of the Bootcamp courses and update the value of Bootcamp average cost when deleting a course, updating a course price, or adding a course to the Bootcamp.

- Query strings for filtration, sort, select, search, and pagination with page and limit.

- Handling Errors (Mongoose Bad ObjectId - Mongoose duplicate key - Mongoose Validation Error - Server error)

- Populate and reverse of populate(Virtuals)

- Cascading delete

Review functionalities for Bootcamps:
(Get reviews for a specific Bootcamp by BootcampID - Get a single review for a Bootcamp by BootcampID - Add a review for a Bootcamp by BootcampID - Update a review - Delete a review)
- Calculate the average rating of a Bootcamp by calculating the average rates of the Bootcamp reviews and update the value of Bootcamp rating when deleting a Bootcamp review, updating a Bootcamp review, or adding a review to the Bootcamp.
