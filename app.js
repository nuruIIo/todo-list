const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
require("dotenv").config();
const todoRoutes = require("./routes/todo.routes");
const viewRoutes = require("./routes/view.routes");
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "views");
app.use(express.static("views"));
app.use(express.static("public"));
app.use("/", viewRoutes);
app.use("/api/todos", todoRoutes);

async function start() {
  try {
    const connection = await mongoose.connect(process.env.dbUri);
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(`error occured ${error}`);
  }
}

start();
