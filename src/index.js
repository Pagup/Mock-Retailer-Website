import React from "react";
import ReactDOM from "react-dom";


console.log("This is a test.")

const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Server setup.
let port = process.env.PORT;

if(port == null || port == ""){
    port = 3000;
}

// app.route("/")


app.listen(port, () => {
    console.log("Server is running on port " + port);
});


//Beginning of database setup.
var mongoDB = "mongodb+srv://admin-aa:test123@prototypecluster.rbkx4.mongodb.net/products";
const productCollection = 'collection';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('disconnected', () => {
    console.log("MongoDB database disconnected successfully.")
});

db.once("open", () => {
    console.log("MongoDB database connection established.");
})

 const productSchema = new mongoose.Schema({
name: String,
category: String,
productid: Number,
quantity: Number,
price: Number,
'review-score': Number,
description: String,
'image-url': String
 });

const productModel = mongoose.model('Product', productSchema, productCollection)

productModel.find((err, products) => {
    if (err) return console.error(err);
    console.log(products);
})
//End of database setup.



ReactDOM.render( <h1> Hello!</h1>, document.getElementById("productDisplay") );