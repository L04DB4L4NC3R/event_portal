const mongoose = require("mongoose");


exports.teams = mongoose.model("team",new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ppl:{
        type:[{
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            rollno:{
                type:String,
                required:true
            },
            roomno:{
                type:String,
                required:true
            },
            phone:{
                type:String,
                required:true
            }
        }],
        required:true
    },
    repo:String,
    initialpitch:String,
    finalpitch:String
}));