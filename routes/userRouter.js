const express = require ("express");
const {createUser} = require("../controllers/userControl") 
const router = express.Router();

// Define routes here
router.post("/create", createUser);

module.exports= router