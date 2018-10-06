const {
    teams
} = require("../schema/schema");
const router = require("express").Router();


/**
 * @api {post} /teams/add add a team
 * @apiName add a team
 * @apiGroup all
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



module.exports = router;