// This file is for setting up the Express app, middleware, and routes
//Express is a Node.js web framework that makes building server-side applications much easier. Think of it as a toolkit to handle HTTP requests and responses.

// The main web framework.
import express from 'express';
// middleware to enable Cross-Origin Resource Sharing (allows frontend apps from different domains to access this API).
import cors from 'cors';
// middleware for logging HTTP requests (useful for debugging).
import morgan from 'morgan';

// Creates an Express application instance, app will hold all the middleware, routes, and configurations
// We can think of app as the server object
const app = express();


// Registers the cors middleware on the server object, every request will go through this middleware
// This ensures that the backend can be accessed from other domains
app.use(cors());
// Registers the morgan middleware in dev mode to log the incoming request in concise format like:
// GET / 200 12ms
app.use(morgan('dev'));
// Registers built-in Express middleware to parse incoming JSON requests. Example: If a client sends { "name": "Abdul" } in the body, it will be automatically available as req.body.
app.use(express.json());

// Sets up a GET route on /.
// req → the incoming request object.
// res → the response object to send data back to the client.
// When someone visits http://localhost:{PORT}/, they get the response in the res.send whatever it is.
app.get('/', (req, res) => {
  res.send('Hello from backend:');
});

// Exports the app instance so other files can import it, e.g., server.ts uses it to start the server.
// This allows modular structure, keeping app configuration separate from server startup.
export default app;





/*
Client (Browser/Frontend)
         |
         v
      [Request]
         |
         v
      server.ts
  (starts the app on PORT)
         |
         v
        app (Express instance)
         |
         |---> cors middleware (handles cross-origin checks)
         |
         |---> morgan middleware (logs request info)
         |
         |---> express.json() middleware (parses JSON body)
         |
         |---> Route handlers (e.g., app.get('/'))
                   |
                   v
               Route logic executes
                   |
                   v
             res.send('Hello from backend')
                   |
                   v
              Response back to client

*/