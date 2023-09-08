const express =  require('express');
const {
    createUser,
    getInformation,
    deleteUser,
    getAdmin,
  } = require("../Services/UserService");
  
  const router = express.Router();
  
 
  router.post("/register", createUser);
  router.get("/allusers", getInformation);
  router.delete("/allusers/:id"  , deleteUser )
  router.get("/allusers/:id" , getAdmin)
  
  module.exports = router;