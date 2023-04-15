const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")

app.use(express.json())

app.use(cors())

const port = process.env.PORT || 3006;

app.listen(port, (err) => {
    if (err) console.log (err)
    console.log("Server is running on port ", port);
    require("./config/db.config")
})