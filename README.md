# Teekkariwappu.fi

> Teekkariwappu.fi, wappu app built with the MERN stack along with Redux for state management and Reactstrap.

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
