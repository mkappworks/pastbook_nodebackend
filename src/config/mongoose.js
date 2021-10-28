const mongoose = require("mongoose");
require("dotenv/config");

//mongo client to connect the the mongodb hosted in mongodb cloud
mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((db) => {
    console.log("Connected to MonogoDB");
  })
  .catch((error) => console.log("Not Connected to MonogoDB due : " + error));
