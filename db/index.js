const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/express-basic-auth";

mongoose
  .connect(`mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.ftety.mongodb.net/class-user?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
