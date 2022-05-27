import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import passport from 'passport';
import authRouter from "./routes/Auth";
import RequireAuth from "./controllers/RequireAuth";
import APIversion from "./controllers/version";
import MovementsRouter from "./routes/Movements";

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(cors())

// Passport init
require('./lib/passport');
app.use(passport.initialize());

app.get("/",  APIversion)

// Authentication routes
app.use('/auth', authRouter);



app.use(RequireAuth)

// Secure routes
app.use('/movements', MovementsRouter);





app.listen(5000, async () => {
     console.log(`app is listening to port 5000`);
})