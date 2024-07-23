# SimplyFI-
# Node.js Backend Assignment

This is a Node.js backend application to manage articles, users, likes, views, and notifications using MongoDB.

## Features

1. Create a table “articles” that has id, title, author, body, number of likes, and number of views.
2. Create a table “users” that has id and name.
3. Track articles liked and viewed by users.
4. Use a caching mechanism to keep track of views and likes for the most popular articles in memory.
5. Notification system that sends notifications to users once the article posted by the user is liked. Keep track of notifications in a table.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer (for notifications)

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/nodejs-backend-assignment.git
    cd nodejs-backend-assignment
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Make sure MongoDB is running on your local machine at `mongodb://localhost:27017`.

4. Start the server
    ```bash
    node index.js
    ```

## API Endpoints

### Create a new article
- **URL:** `/articles`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "title": "My First Article",
      "author": "Author Name",
      "body": "This is the body of the article."
    }
    ```

### Create a new user
- **URL:** `/users`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "name": "User Name"
    }
    ```

### Like an article
- **URL:** `/articles/:id/like`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "userId": "USER_ID"
    }
    ```

### View an article
- **URL:** `/articles/:id/view`
- **Method:** `POST`
- **Body:**
    ```json
    {
      "userId": "USER_ID"
    }
    ```

### Get notifications
- **URL:** `/notifications`
- **Method:** `GET`

## Example Usage

#### Create a new article
```bash
curl -X POST http://localhost:3000/articles -H "Content-Type: application/json" -d '{"title": "My First Article", "author": "Author Name", "body": "This is the body of the article."}'
