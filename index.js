
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.API_PORT || 8080;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});