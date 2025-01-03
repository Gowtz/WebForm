import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const URL = process.env.URL || `http://localhost:${PORT}`;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`The server is running in ${URL} `));
