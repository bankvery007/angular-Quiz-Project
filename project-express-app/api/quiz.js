var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const authorization = require('../config/authorize')

var Schema = require("mongoose").Schema;

const quizSchema = Schema({
    quizName: String,
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

router.route('/addQuiz')
    .post((req, res) => {
        const payload = {
            quizName: req.body.quizName,
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
router.route('/getQuiz')
    // V authorization V อยู่ตรงนี้ 
    // ตัวอย่าง .get(authorization, (req, res) => {
    .get((req, res) => {
        Quiz.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(val);
            }
        })
    })

module.exports = router