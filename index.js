const express = require("express");
require('dotenv').config();
const router = require("./Router/UserRoutes");


const app = express();
app.use(express.json())
app.use("/",router)




app.listen(process.env.NODEPORT,()=>{
        console.log("running on ",process.env.NODEPORT)
})
