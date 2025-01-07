import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import database from "./db.js";
import Routes from "./Routes/routes.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Routes);
app.use(express.json());

database();

server.listen(8000, () => {
  console.log("Running on port 8000");
});
