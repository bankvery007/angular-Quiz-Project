var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const authorization = require('../config/authorize')

var Schema = require("mongoose").Schema;

const quizSchema = Schema({
    quizName:String ,
    date:Date,
    questions:Array,
},{
    collection: 'quizzes'
});

let Quiz
try{
    Quiz = mongoose.model('quizzes')
} catch (error){
    Quiz = mongoose.model('quizzes',quizSchema);
}

router.route('/quiz')
    .get(authorization,(req,res)=>{
        Quiz.find((err,val)=>{
            if(err){console.log(err)
            }else{
                res.status(200).json(val);
            }
        })
        
    })

module.exports = router