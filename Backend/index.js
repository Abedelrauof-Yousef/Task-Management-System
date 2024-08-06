const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PROD_port || 3001;
const cors = require ("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute");

app.use(cors());
app.use(bodyParser.json())


app.use("/api/users", userRoutes);

app.listen(port, ()=> {
    console.log(`running on port ${port}`);
});

