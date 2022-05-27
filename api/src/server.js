import 'dotenv/config' 
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import passport from 'passport';
import authRouter from "./routes/Auth";
import RequireAuth from "./controllers/RequireAuth";
import MovementsRouter from "./routes/Movements";
import { APIVersion, Handle404 } from './controllers/misc';

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(cors())

// Passport init
require('./lib/passport');
app.use(passport.initialize());

app.get("/", APIVersion)
// Authentication routes
app.use('/auth', authRouter);

// Secure routes
app.use(RequireAuth)
app.use('/movement', MovementsRouter);
app.use(Handle404)
const port = process.env.PORT || 5000;



app.listen(port, async () => {
     console.log(`API served @ port ${port}`);
})