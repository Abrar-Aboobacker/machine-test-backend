const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,  
    },
    status:{
        type:String,
        default:'verified'
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", userSchema);