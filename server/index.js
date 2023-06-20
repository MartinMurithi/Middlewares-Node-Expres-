const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHnadler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5000;

const app = express();

app.use(logger);
app.use("/", express.static("public"));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Home.html"));
  console.log(__dirname);
});

app.get("/contacts", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contacts.html'));
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      success: false,
      message: "Resource you requested does not exist",
    });
  } else {
    res.type("txt").send("Resource you requested does not exist");
  }
});

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
