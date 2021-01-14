require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "🐶🐕"
  });
});

app.post("/woofs", (req,res) => {
  console.log(req.body);
})
// Listener
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));