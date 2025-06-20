import express, { Request, Response} from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

/* Express app and port to be used for hosting on localhost */
const app = express();
const PORT: number = 5000;

/* Url for the mongo db used for the backend */
const MONGO_URL = "mongodb+srv://Calvin:Tester123@personalwebsite.poh4fzi.mongodb.net/Website?retryWrites=true&w=majority&appName=PersonalWebsite";

/* Enables Cors */
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

/* Additional modules for use by the server */
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

/* Creates http server using the express app */
const server = http.createServer(app);

/* Connects to Mongodb and configures Mongodb to use promises and error catching */
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

/* Status route to get the status of the server */
app.get('/status', (req: Request, res: Response) => {
  const status = {
    "Status": "Running"
  };

  res.json(status);
});

/* Creates server to listen on given localhost port */
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 

/* Mount router with other paths */
app.use('/', router());