import express, { ErrorRequestHandler } from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import userRoute from "./routes/user";
const PORT = process.env.PORT || 8000;
export const URL = process.env.URL || `http://localhost:${PORT}`;
import "./lib/Auth";
import mongoose from "mongoose";
const app = express();

//middlewares
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 24,
    },
  }),
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", userRoute);
const errorhandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({
    error: err,
  });
};

app.use(errorhandler);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() =>
    app.listen(PORT, () => console.log(`The server is running in ${URL} `)),
  )
  .catch(() => console.log(`There is error in connecting to mongodb`));
