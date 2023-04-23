# Task Manager   

This codebase is an example project of how to create an Task Manager API using nodejs, and express.
There is a separate file called tasks.json which stores the tasks in an inbuilt memory.
The starting point of the app is app.js 

* To install the node modules using the following command:
```npm install```
* To start the project use:
``` npm start ```

## APIs for Task Manager
The following APIs are being implemented:

1. GET: This API gets all the tasks list from the tasks.json file.To hit this use get request on postman and [get_all_task](http://localhost:5000/tasks).


2. GET ID: This API gets the specific tasks with an id from the tasks.json file.To hit this use get request on postman and [get_task_by_id](http://localhost:5000/tasks/id)


3. POST: This API create a new task which requires a description in body of the request.To hit this use the post request on postman and [create_new_task](http://localhost:5000/tasks/id).


4. PUT: This API updates the already created task which requires a description or flag in body of the request.To hit this use the put request on postman and [update_task](http://localhost:5000/tasks/id).

5. DELETE: This API deletes the tasks from the list and updates the json file.To hit this use the DELETE request on postman and [delete](http://localhost:5000/tasks/id).
