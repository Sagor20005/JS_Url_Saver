const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes.js")
const helmet = require("helmet")

const port = 2000 || 3333;

app.use(cors());
// app.use((req, resp, next) => {
//   resp.header("Access-Control-Allow-Origin", "*")
// }) 
app.use(express.json());
app.use(router);

app.listen(port,()=>{
  console.log(`server is runing at => ${port}`)
})