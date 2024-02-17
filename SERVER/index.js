const express = require("express");
const app = express();
const queryRoute = require('./routes/query')
const cors = require('cors');

const dbConnect = require("./config/database");
dbConnect();

require('dotenv').config();

app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:3000',
        credentials:true
    })
)

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server activating at Port ${PORT}`)
})

//mapping the routes
app.use("/api/v1", queryRoute);