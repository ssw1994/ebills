const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const billRouter = require("./server/Controller/bill.controller");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static("build"));
app.use("/api", billRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
