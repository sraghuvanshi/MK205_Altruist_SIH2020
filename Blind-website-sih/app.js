const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

const PORT = process.env.PORT || 4005;
var indexRouter = require("./routes/index");

const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

//static pages
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/", indexRouter);

// server port
app.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
