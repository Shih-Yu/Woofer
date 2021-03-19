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

// Connect to mongoose(locally on db named woofer)
mongoose.connect(
  "mongodb://127.0.0.1:27017",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);

let woofSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"]
  },
  breed: {
    type: String,
    required: [true, "Must provide a breed"]
  },
  message: {
    type: String,
    required: [true, "Must provide a message"]
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// Model
let WoofModel = mongoose.model("woof", woofSchema);
// Routes
app.get("/", (req, res) => {
  WoofModel
    .find()
    .then(woofs => res.json(woofs))
    .catch(err => res.json(err))
});

//Function to check that the input from user is valid
// function checkWoof(woof) {
//   // Makes sure incoming name/breed/woof is not empty
//   return woof.name && woof.name.toString().trim() !== "" &&
//          woof.breed && woof.brees.toString().trim() !== "" &&
//          woof.woofs && woof.woofs.toString().trim() !== "";
// }

app.post("/woofs", (req,res) => {
  // if(checkWoof(req.body)){
    // Insert incoming request into db(converting incoming data to string to make sure only string is inserted into db)
    let woof = new WoofModel({
      name: req.body.name.toString(),
      breed: req.body.breed.toString(),
      woofs: req.body.woofs.toString(),
      date: new Date()
    });
    // Saving incoming data into db
    woof
      .save()
      .then(woofs => res.json(woofs))
      .catch(err => res.json(err));

  // } else {
  //   res.status(422);
  //   res.json({
  //     message: "Please fill out the form"
  //   })
  // }
})
// Listener
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));