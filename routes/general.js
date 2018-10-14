const router = require("express").Router();


router.get("/contact",(req,res,next)=>{
    res.render("contact");
});

router.get("/repo",(req,res,next)=>{
    res.render("repo");
});


module.exports = router;