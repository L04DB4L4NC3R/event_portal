require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
require("morgan")("dev");
const bp = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");


const cors = require("cors");
app.use(cors());

app.engine('hbs',hbs());
app.set("view engine",'hbs');
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));
app.use(express.static("static"));

mongoose.connect(process.env.DBURL,{useNewUrlParser:true});
mongoose.connection.once("open",()=>console.log("Connected to database"))
.on("error",()=>console.log("Error connecting to DB"));

app.get("/",(req,res,next)=>{
    res.render("index");
});
app.get("/docs",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"static/docs/docs.html"));
});
app.use((err,req,res,next)=>{
    res.status(500).json({err});
});
app.use("/teams",require("./routes/teams"));
app.use("/admin",require("./routes/admin"));
app.use(require("./routes/general"));

app.listen(process.env.PORT || 3000,()=>console.log("Listening..."));
