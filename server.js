const express = require("express");
const app = express();
const appRoute = require("./routes/router.js")
app.use(express.json());
require('dotenv').config();

app.use("/",appRoute)
app.listen(5000,(req,res)=>{
    console.log("serevr started")
})