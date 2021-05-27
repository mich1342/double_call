# Double Call

Double Call is an API server in Node Js that will return the image URL of movie posters using OMDb API to get the Poster URL.

It also features user-password login with a bearer auth token. Each user can do:
1. Login using bearer auth token with a hashed password.
2. Add their favorite movie to their own list.
3. Fetch/get all of their own favorite movie poster URL.

A non-user can do:
1. Add/register as a new user.
2. Get a specific movie title poster URL.

This project developed using:
1. MySql Database with Apache server (XAMPP v3.3.0)
2. Node Js v14.17.0
3. npm v6.14.13
4. Visual Studio Code v1.56.2
5. Dependencies:
   - axios v0.21.1
   - bcrypt v5.0.1
   - dotenv v10.0.0
   - express v8.5.1
   - jsonwebtoken v8.5.1
   - mysql2 v2.2.5
   - pino v6.11.3
   - sequelize v6.6.2
6. Dev Dependencies (optional but recomended):
   - nodemon v2.0.7
   
## Installation
1. Clone this repository into your local folder.
2. Make sure you have all dependecies listedin the package.json file.
3. Set all of the variable in the .env variable. Make sure the port you choose is free and you can get OMDB auth token at omdbapi.com or you can use my key (1000 request limit a month).
4. Set your database parameters in the config.json file inside config folder (./config/config.json).
5. You do not need to setup any table inside your database, the sequelize will automatically generate the table if it is not found.
## How to use
1. run this command in the terminal
```bash
npm run dev
```
2. You should get information about which port the server is listening to.
3. You can use postman app to make a api request.

## API request list

all commands below based on the 'host/port/' url.

Example: GET('/') => Get request with "localhost/3000/test" url.

You might need to adjust your host and port accordingly.

To set the bearer key, set 'Authorization' header to format 'bearer {YOUR KEY}'

Every json data with curly bracket (ex. : "{username}") means the username data in strings. Data with square bracket (ex. : [user_id]) means the user_id is in integer or number. You should handle it as 1 instead of "1" in the body part of the request.

### Get Method

#### Get('/')
Used to check the connection between the postman app and the server. No need any headers or auth.

Expected response:
```JSON
    {
        "test":"test1111"
    }
```

#### Get('/user/all')
Used to get all user data in database (for testing purposes only). Need Authorization.

Typical expected response:
```JSON
[
    {
        "id": "[User ID 1]",
        "name": "{Username 1}",
        "password": "{Hashed User Password 1}",
        "createdAt": "{User 1 Create time}",
        "updatedAt": "{User 1 Last Updata}"
    },
    {
        "id": "[User ID 2]",
        "name": "{Username 2}",
        "password": "{Hashed User Password 2}",
        "createdAt": "{User 2 Create time}",
        "updatedAt": "{User 2 Last Updata}"
    },
]
```
#### Get('/movies/{YOUR MOVIE TITLE')
Used to get specific movie poster url from OMDB api based on the title you inputed. Do not need Authorization.

Expected response:
    The poster url if the movie found.

#### Get('/movies')
Forbiden

#### Get('/movie/favorite')
Used to get all current user (based on the bearer token) favorit movie url. Need Authorization. The response will be strings of all of the urls seperated by a coma. If the movie poster is not found, the link will be equal to Not Found.

Expected response:
```JSON
{
    "links":"{LINK1,LINK2,....}"
}
```

#### Post('/api/login')
Used to login and get auth bearer token. Do not need Authorization.

Expected request body:
```JSON
{
    "name": "{USERNAME}",
    "password": "{PASSWORD}"
}
```

Expected response:
```JSON
{
    "token": "{YOUR TOKEN}"
}
```

#### Post('/movies/favorite')
Used to add new movie title to your favorite list. Need Authorization.

Expected request body:
```JSON
{
    "title":"{YOUR MOVIE TITLE}"
    
}
```

Expected response:
```JSON
{
    "id": "[Movie ID]",
    "title": "{Movie Title}",
    "user_id": "[User ID]",
    "updatedAt": "{Last Update Time}",
    "createdAt": "{Creation Time}"
}
```

#### Post('/user/new')
Used to add a new user to the database. Do not need Authorization.

Expected request body:
```JSON
{
    "name":"{Username}",
    "password":"{password}"
}
```

Expected response body:
```JSON
{
    "id": "[user_id]",
    "name": "{username}",
    "password": "{password}",
    "updatedAt": "{Last update time}",
    "createdAt": "{Creation time}"
}
```
