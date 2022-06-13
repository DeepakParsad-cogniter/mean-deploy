const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const tweetRoute = require("./routes/tweet");

require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tweets", tweetRoute);

app.use(express.static(path.join(__dirname, "client", "build")));

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb+srv://dparsad:@password123@cluster0.mqasazh.mongodb.net/?retryWrites=true&w=majority", { useMongoClient: true }, (err) => {
//     if (err) console.error(err);
// });
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Listening on " + port);
});


