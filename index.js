const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Asia Adventures Hub Surver is running!");
  });
  
  app.listen(port, () => {
    console.log(`Asia Adventures Hub is running on Port:${port}`);
  });