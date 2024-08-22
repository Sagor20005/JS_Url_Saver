const mongoose = require("mongoose");

const db_url = "mongodb+srv://ms6392883:root@chatingdb.qvpw3qv.mongodb.net/";

const mongodb = (async function(){
  try{
    mongoose.connect(`${db_url}social_card`);
    console.log("database connected...")
  }catch(err){
    console.log(`database connect faild => ${err}`)
  }
})();

module.exports = mongodb;