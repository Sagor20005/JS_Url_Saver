const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  bio:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  }
});
const userModel = mongoose.model("users_db",userSchema);

const accountSchema = new mongoose.Schema({
  platform:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  url:{
    type:String,
    required:true,
    unique:true
  },
  authorId:{
    type:String,
    required:true
  }
})
const accountModel = mongoose.model("account_db",accountSchema)
const collections = {
  userCollection:userModel,
  accountCollection:accountModel,
}
module.exports = collections;