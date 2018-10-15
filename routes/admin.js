const router = require("express").Router();
const {
    teams
} = require("../schema/schema");
const jwt = require("jsonwebtoken");



router.get("/",(req,res,next)=>{
    res.render("admin")
})

/**
 * @api {post} /admin/login login admin
 * @apiName login admin
 * @apiGroup admin
 * @apiParamExample {json} request
 * {
	"username":"root",
	"password":"toor"
}
 * @apiParamExample {json} response
 * {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6ImFkbWluIiwiaWF0IjoxNTM4ODUwMjI2fQ.ZsKJ91xRf_LOt4SEPsH7U6BWt552oTyb7ptrfcFCabQ"
}
 */
router.post("/login",(req,res,next)=>{
    if(req.body.username === process.env.ADMINUSER && req.body.password === process.env.ADMINPASSWORD){
        jwt.sign({
            level:"admin"
        },process.env.SECRET,(err,token)=>{
            if(err)
                next(err)
            res.json({token});
        });
    } else
        res.json({message:"Wrong credentials"});
});



router.get("/land",(req,res,next)=>{
   res.render("land_admin");
});


/**
 * @api {get} /admin/view view teams
 * @apiName view teams
 * @apiGroup admin
 * @apiPermission admin

 * @apiParamExample {json} response
[
    {
        "_id": "5bb8fa2bd0cbc35fbd713e42",
        "name": "renegades",
        "ppl": [
            {
                "_id": "5bb8fa2bd0cbc35fbd713e43",
                "name": "angad",
                "email": "angadsharma1016@gmail.com",
                "rollno": "17BCE2009",
                "roomno": "Q753",
                "phone": "9971673330"
            }
        ],
        "__v": 0
    }
]
 */
router.get("/view",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || data.level !=="admin")
            return res.json({message:"Some error occurred"});
        teams.find({})
        .then(d=>res.json(d))
        .catch(next);
    });
});







/**
 * @api {get} /admin/delete/{team} delete teams
 * @apiName delete teams
 * @apiGroup admin
 * @apiPermission admin
@apiParam {string} team team name
 * @apiParamExample {json} response
[
    {
        "_id": "5bb8fa2bd0cbc35fbd713e42",
        "name": "renegades",
        "ppl": [
            {
                "_id": "5bb8fa2bd0cbc35fbd713e43",
                "name": "angad",
                "email": "angadsharma1016@gmail.com",
                "rollno": "17BCE2009",
                "roomno": "Q753",
                "phone": "9971673330"
            }
        ],
        "__v": 0
    }
]
 */
router.get("/delete/:team",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || data.level !=="admin")
            return res.json({message:"Some error occurred"});
        teams.findOneAndRemove({name:req.params.team})
        .then(()=>res.json({message:"Team deleted"}))
        .catch(()=>res.json({message:"error deleting team, it may not exist"}));
    });
});

module.exports = router;