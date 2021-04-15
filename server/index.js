const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //for getting data from client side

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})

