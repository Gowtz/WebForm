import express, { ErrorRequestHandler } from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import userRoute from "./routes/user";
import mongoose from "mongoose";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
const FRONT_URL = process.env.FRONT_URL as string;
const PORT = process.env.PORT || 8000;
export const URL = process.env.URL || `http://localhost:${PORT}`;
import "./lib/Auth";

//Redis Connect
export const client = createClient({
  url: process.env.REDIS || "redis://localhost:6379",
});
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

client.on("error", (err) => {
  console.error(`Redis error: ${err}`);
});

const app = express();
//middlewares
app.use(
  cors({
    origin: [FRONT_URL, URL, "http://localhost"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: new RedisStore({ client }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 24,
    },
  }),
);
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
