const dotenv = require("dotenv").config()
const express = require("express");
const app = require("./src/routes/app");
const { dbConnection } = require("./src/config/database");

dbConnection();

app.listen(8080, ()=>{
    console.log("System works")
})