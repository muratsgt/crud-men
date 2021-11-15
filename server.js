const express = require("express");
const connectDB = require("./helper/dbConnect");
const router = require("./routes/router");
require("dotenv").config();


// server
const app = express();
const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`I'm listening on port ${port}`);
});

// database connect
connectDB();

app.use(express.json());
app.use("/api", router);
