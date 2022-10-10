import {} from 'dotenv/config'

// Bring in the express server and create application
import express, { json } from 'express';
let app = express();

import { logErrors, clientErrorHandler, errorHandler } from './helpers/ErrorHelpers.js';

var router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(json());

import ActorRoute from './routes/ActorRoute.js';
import FilmRoute from './routes/FilmRoute.js';

// Create Routes for actors
router.use('/actors', ActorRoute);
router.use('/films', FilmRoute);

app.use('/api/', router);

// Configure exception logger
app.use(logErrors);
// Configure client error handler
app.use(clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHandler);


// Create server to listen on port 5000
const PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => console.log(`Node server is running on http://localhost:${PORT}`));
