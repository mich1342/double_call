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


