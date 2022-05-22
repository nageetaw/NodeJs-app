const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.51a5n.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch(() => {
    console.log("Error");
  });
