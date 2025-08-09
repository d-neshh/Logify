const { Router } = require("express")
// This line is importing the Router class from the express module
const User = require('../models/user')
const router = Router();

router.get('/signin',(req, res)=>{
    return res.render("signin")
})

router.get('/signup',(req, res)=>{
    return res.render("signup")
})

router.get('/logout',(req, res)=>{
  return res.clearCookie("token").redirect("/");
})

router.post('/signup',async (req, res)=>{
    const { fullName, email, password }= req.body;
    await User.create({
        fullName,
        email,
        password,
    })
    //The create() method is a static method provided by Mongoose models that allows you to create and save a new document in one step.
    return res.redirect("/");
})


router.post('/signin',async (req, res)=>{
    const { email, password }= req.body;

    try {
        
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("token", token);
    return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error:"Incorrect Email or Password"
        });
    }
})
module.exports = router;