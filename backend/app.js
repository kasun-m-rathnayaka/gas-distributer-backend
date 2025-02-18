import express from 'express';
import {PORT} from "./config/env.js";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.route.js";
import authRoute from "./routes/auth.route.js";
import statusRoute from "./routes/status.route.js";
import tokenRoute from "./routes/token.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import connectToDatabase from "./database/mongodb.js";
import cors from 'cors';
import outletRoute from "./routes/outlet.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

// '/api/v1/' Middleware
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/token', tokenRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/status', statusRoute)
app.use('/api/v1/outlet', outletRoute)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectToDatabase();
});
