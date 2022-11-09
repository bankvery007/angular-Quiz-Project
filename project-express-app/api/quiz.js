const e = require('express');
var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const authorization = require('../config/authorize')

var Schema = require("mongoose").Schema;

const quizSchema = Schema({
    quizName: String,
    owner: String,
    datetime: String,
    count: Number,
    img: String,
    quiz: Array,
}, {
    collection: 'quizzes'
});

let Quiz
try {
    Quiz = mongoose.model('quizzes')
} catch (error) {
    Quiz = mongoose.model('quizzes', quizSchema);
}
// Add Quiz
// Add New Quiz
const addQuiz = (QuizData) => {
    return new Promise((resolve, reject) => {
        var new_quiz = new Quiz({
            quizName: QuizData.quizName,
            owner: QuizData.owner,
            datetime: QuizData.datetime,
            count: QuizData.count,
            img: QuizData.img,
            quiz: QuizData.quiz
        });
        new_quiz.save((err, data) => {
            if (err) {
                reject(new Error('Cannot add quiz to DB!'));
            } else {
                resolve({ message: 'Add quiz successfully' });
            }
        });
    });
}

router.route('/Quiz')
    .post(authorization, (req, res) => {
        const payload = {
            quizName: req.body.quizName,
            owner: req.body.owner,
            datetime: req.body.datetime,
            count: req.body.count,
            img: req.body.img,
            quiz: req.body.quiz,
        }
        console.log(payload);
        addQuiz(payload)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    });


// Get Quiz
router.route('/Quiz')
    // V authorization V อยู่ตรงนี้ 
    // ตัวอย่าง .get(authorization, (req, res) => {
    .get(authorization, (req, res) => {
        Quiz.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(val);
            }
        })
    })

// Patch Quiz
router.route('/Quiz/:id')
    .patch(authorization, (req, res) => {
        Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((blog) => {
            if (!blog) {
                return res.status(404).send();
            }
            res.send(blog);
        }).catch((error) => {
            res.status(500).send(error);
        })
    });

// Delete Quiz
router.route('/Quiz/delete/:id')
    .delete(authorization, (req, res) => {
        uid = req.params.id
        Quiz.remove({"_id":uid}, function(err, result) { 
            if(err){
                res.status(500).send(err);
            }else{
                if(result.deletedCount == 0){
                    res.send({comment: "Can't find user"})
                }else{
                    res.send({comment: 'Delete'})
                }
            }
        });
    });

module.exports = router