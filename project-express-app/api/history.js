var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const authorization = require('../config/authorize')

var Schema = require("mongoose").Schema;

const HistorySchema = Schema({
    comment: String,
}, {
    collection: 'history'
});

let History
try {
    History = mongoose.model('history')
} catch (error) {
    History = mongoose.model('history', HistorySchema);
}


// Add New History
const addHistory = (HistoryData) => {
    return new Promise((resolve, reject) => {
        var new_history = new Comment({
            username: HistoryData.username,
            quizname: HistoryData.quizname,
            score: HistoryData.score,
            date: HistoryData.date
        });
        new_history.save((err, data) => {
            if (err) {
                reject(new Error('Cannot add new_history to DB!'));
            } else {
                resolve({ message: 'Add new_history successfully' });
            }
        });
    });
}

router.route('/addHistory')
    .post((req, res) => {
        const payload = {
            username: HistoryData.username,
            quizname: HistoryData.quizname,
            score: HistoryData.score,
            date: HistoryData.date
        }
        console.log(payload);
        addHistory(payload)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    });

// Get History
router.route('/getHistory')
    .get((req, res) => {
        History.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(val);
            }
        })
    })

module.exports = router