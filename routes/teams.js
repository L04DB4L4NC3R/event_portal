const {
    teams
} = require("../schema/schema");
const router = require("express").Router();
const jwt = require("jsonwebtoken");


/**
 * @api {post} /teams/add add a team
 * @apiName add a team
 * @apiGroup team
 * 
 * @apiParamExample {json} request
 * {
	"name":"renegades",
	"ppl":[
		{
			"name":"angad",
			"email":"angadsharma1016@gmail.com",
			"rollno":"17BCE2009",
			"roomno":"Q753",
			"phone":"9971673330"
		}
	]
}
@apiParamExample {json} response
{
    "data": {
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
}
 */
router.post("/add",(req,res,next)=>{
    console.log(req.body)
    let len = req.body.ppl.length;  
    if(req.body.name === '' || len > 4 || len < 1)
        next(new Error("Invalid or incomplete input"));
    teams.findOne({name:req.body.name})
    .then((team)=>{
        if(!team){
            teams.create(req.body)
            .then(data=>res.json({data}))
            .catch(next);
        } else
            res.json({message:"Team already exists"});
    }).catch(next);
});



/**
 * @api {post} /team/login login team
 * @apiName login team
 * @apiGroup team
 * @apiParamExample {json} request
 {
	"username":"renegades",
	"password":"5bb8fa2bd0cbc35fbd713e42"
}
 * @apiParamExample {json} response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6InRlYW0iLCJuYW1lIjoicmVuZWdhZGVzIiwiaWF0IjoxNTM4ODUxNTU4fQ.BaT9c96LhZeh8KQxWXtmAnI5znhHCEYopGIRLGBYOTM"
}
 */
router.post("/login",(req,res,next)=>{
    teams.findOne({name:req.body.username})
    .then((team)=>{
        if(!team)
            return res.json({message:"NO team found"});
            console.log(req.body.password + "   " + team._id)
        if(req.body.password==team._id){
            jwt.sign({
                level:"team",
                name:team.name
            },process.env.SECRET,(err,token)=>{
                if(err)
                    next(err);
                res.json({token});
            });
        } else 
            res.json({messgae:"username or password wrong"});
    }).catch(next);
});





/**
 * @api {post} /team/addRepo add repo 
 * @apiName add repo 
 * @apiPermission team
 * @apiGroup team
 * @apiParamExample {json} request
{
	"data":"https://github.com/angadsharma1016/event_portal.git"
}

 */
router.post("/addRepo",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || !data || data.level !== "team")
            return res.json({message:"Some error occurred"});
        teams.findOneAndUpdate({name:data.name},{repo:req.body.data})
        .then((d)=>res.json({message:"Done"}))
        .catch(next);
    });
});




/**
 * @api {post} /team/addPitch1 add initital pitch 
 * @apiName add initital pitch 
 * @apiGroup team
 * @apiPermission team
 * @apiParamExample {json} request
{
	"data":"is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web "
}   
 */
router.post("/addPitch1",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || !data || data.level !== "team")
            return res.json({message:"Some error occurred"});
        teams.findOneAndUpdate({name:data.name},{initialpitch:req.body.data})
        .then((d)=>res.json({message:"Done"}))
        .catch(next);
    });
});





/**
 * @api {post} /team/addPitch2 add final pitch 
 * @apiName add final pitch 
 * @apiPermission team
 * @apiGroup team
 * @apiParamExample {json} request
{
	"data":"is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web "
}

 */
router.post("/addPitch2",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || !data || data.level !== "team")
            return res.json({message:"Some error occurred"});
        teams.findOneAndUpdate({name:data.name},{finalpitch:req.body.data})
        .then((d)=>res.json({message:"Done"}))
        .catch(next);
    });
});



/**
 * @api {get} /teams/unregister unregister team
 * @apiGroup team
 * @apiName unregister team
 * @apiPermission team
 */
router.get("/unregister",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || !data || data.level !== "team")
            return res.json({message:"Some error occurred"});
        teams.findOneAndRemove({name:data.name})
        .then((d)=>res.json({message:"Done"}))
        .catch(next);
    });
});





/**
 * @api {get} /teams/deluser/:user unregister member
 * @apiGroup team
 * @apiName unregister member
 * @apiPermission team
 */
router.get("/unregister/:member",(req,res,next)=>{
    jwt.verify(req.get('Authorization'),process.env.SECRET,(err,data)=>{
        if(err || !data || data.level !== "team")
            return res.json({message:"Some error occurred"});
        teams.findOneAndUpdate({name:data.name},{$pull:{
            ppl:{name:req.params.member}
        }})
        .then((d)=>res.json({message:"Done"}))
        .catch(next);
    });
});


/**
 * @api {post} /teams/join join a team
 * @apiGroup all
 * @apiName join a team
 * 
 * @apiParamExample {json} request
 * {
				"name": "dhruv",
                "email": "angadsharma101@gmail.com",
                "rollno": "17BCE2000",
                "roomno": "Q753",
                "phone": "9971673330",
                "team":"renegades"
}

 */
router.post("/join",(req,res,next)=>{
    teams.findOne({name:req.body.team})
    .then((d)=>{
        if(d.ppl.length === 4)
            return res.json({message:"Sorry team full"});

        for(let p of d.ppl){
            if(p.rollno === req.body.rollno)
                return res.json({message:"You are already added to the team"});
        }
        
        d.ppl.push(req.body);
        d.save().then(()=>res.json({message:"Successfully added to the team"}))
        .catch(next);
    })
    .catch(next);

});


module.exports = router;