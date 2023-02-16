const router = require("express").Router();


const {login ,registration, update}=require("./Cotroller")
console.log(login)
// user registration  or creation 
router.post("/register",registration)

router.post("/login",login)
router.put("/update",update)
module.exports = router