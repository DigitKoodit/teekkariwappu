# Teekkariwappu.fi

> Teekkariwappu.fi, wappu app built with the MERN stack along with Redux for state management and Reactstrap.

## Quick Start

Add   
```
MONGODB_URI = <your mongodb uri>
JWT_SECRET = <your jwt secret>
ADMIN_USERNAME = <admin username for event managing>
ADMIN_PASSWORD = <admin password for event managing>
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

## Event managing

The project has an admin panel for managing events that can be found at <public-url>/admin. The credentials can be set in .env as instructed above.

## Deployment

The master branch has a workflow for deploying straight to an Azure Web App (there's dynamic content so static wouldn't work). Once the Web App is created in Azure, you need to download its publish profile and set it to this repository's secrets "TEEKKARIWAPPU_PUBLISH_PROFILE". Once that's done, the pushes should be deployed to the Web App. Deployment can be skipped by including #skip in the commit message.

## App Info

### Authors

Original server template made by:  
Brad Traversy  
[Traversy Media](http://www.traversymedia.com)  
[Github](https://github.com/bradtraversy/mern_shopping_list)

Original [Teekkariwappu app](https://github.com/aleksivaisanen/teekkariwappu) by [Aleksi Väisänen](https://github.com/aleksivaisanen)

Later modifications & maintaining by [Arttu Huttunen](https://github.com/arttuhuttunen), [Tommi Immonen](https://github.com/immosentomppa) and other Digit ry's Webmasters.

### Version

1.0.0

### License

This project is licensed under the MIT License
