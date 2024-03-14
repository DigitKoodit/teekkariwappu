# Teekkariwappu.fi

> Teekkariwappu.fi, wappu app built with the MERN stack along with Redux for state management and Reactstrap.

# Relevant info
We tried to set this up to AWS 14-15.03.2024, but the project seems to be only startable in dev mode. This repo works in Heroku and apparently the mentioned after start script does some magic that enables it to work in that enviroment. We gave up and threw it back in Heroku. Rewrite when?

The problem with self hosted solution was 1. Either you get type errors from responses being undefined => Maybe frontend is not connecting to backend correctly? 2. Running in dev mode you run into "Invalid Host header" errors as dev builds should only be accessed from local envrionment. We were unable to get around this with the projects current configuration. 

## Quick Start

Add   
```
MONGODB_URI = <your mongodb uri>
JWT_SECRET = <your jwt secret>
```
to .env file

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

If you want to use local MongoDB with Docker, set value of MONGODB_URI to `mongodb://admin:verysecret@localhost:27017`, and run command `docker compose up`.

## Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page

## App Info

### Author

Aleksi Väisänen  
[Github](https://github.com/aleksivaisanen)

Original server template made by:  
Brad Traversy  
[Traversy Media](http://www.traversymedia.com)  
[Github](https://github.com/bradtraversy/mern_shopping_list)  

### Version

1.0.0

### License

This project is licensed under the MIT License
