const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const productModal = require("./models/productModal");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const connectionURL = process.env.MongoDBConnectionString;

// ---------------------------connect with mongodb using mongoose------------------
mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch(() => {
    console.log("Error");
  });

// --------------------------------------------Middleware-------------------------
app.use("/style", express.static("public/css")); // define path for static resources, refer to style/css file name
app.use(express.static(path.join(__dirname, "public"))); //   __dirname gives path from root to current folder, we concatenated index.html
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // to recieve body and url paarmeters
// app.use("/product/api", productRoutes);

// set ejs as default engine
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("about");
});
// listen to port
app.listen(PORT);
