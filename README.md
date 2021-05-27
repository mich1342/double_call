# Double Call

Double Call is an API server in Node Js that will return image url of movie posters using OMDb API to get the Poster url.

It also features user-password login with bearer auth token. Each user can do:
1. Login using bearer auth token with hashed password.
2. Add their favourite movie to their own list.
3. Fetch / get all of their own favorit movies poster url.

## Installation
1. Clone this repository into your local folder.
2. Make sure you have all dependecies listedin the package.json file.
3. Set all of the variable in the .env variable. Make sure the port you choose is free and you can get OMDB auth token at omdbapi.com or you can use my key (1000 request limit a month).
4. Set your database parameters in the config.json file inside config folder (./config/config.json).

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
        "id": "{User ID 1}",
        "name": "{Username 1}",
        "password": "{Hashed User Password 1}",
        "createdAt": "{User 1 Create time}",
        "updatedAt": "{User 1 Last Updata}"
    },
    {
        "id": "{User ID 2}",
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
Used to get all current user (based on the bearer token) favorit movie url. Need Authorization

Expected response:
    Currently it only works in the server console, still in progress

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
    "id": {Movie ID},
    "title": "{Movie Title}",
    "user_id": {User ID},
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