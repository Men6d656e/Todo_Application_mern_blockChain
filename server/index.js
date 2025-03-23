

const express = require("express");
const ABI = require("./ABI.json");
const Web3 = require("web3");

const app = express();

const web3 = new Web3()






app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})