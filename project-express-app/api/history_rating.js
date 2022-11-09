var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const authorization = require('../config/authorize')

var Schema = require("mongoose").Schema;

const History_Rating = Schema({
    owner: String,
    quizName: String,
    datetime: String,
    rating: Number,
}, {
    collection: 'history_rating'
});

let Rating
try {
    Rating = mongoose.model('history_rating')
} catch (error) {
    Rating = mongoose.model('history_rating', History_Rating);
}


// Add New Rating
const addRating = (RatingData) => {
    return new Promise((resolve, reject) => {
        var new_rating = new Rating({
            owner: RatingData.owner,
            quizName: RatingData.quizName,
            datetime: RatingData.datetime,
            rating: RatingData.rating
        });
        new_rating.save((err, data) => {
            if (err) {
                reject(new Error('Cannot add rating to DB!'));
            } else {
                resolve({ message: 'Add rating successfully' });
            }
        });
    });
}

router.route('/addrating')
    .post(authorization, (req, res) => {
        const payload = {
            owner: req.body.owner,
            quizName: req.body.quizName,
            datetime: req.body.datetime,
            rating: req.body.rating,
        }
        console.log(payload);
        addRating(payload)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    });

// Get Rating
router.route('/getrating')
    .get(authorization,(req, res) => {
        Rating.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(val);
            }
        })
    })

//getCountHistory
router.route('/getCountPlayHistory')
    .get((req, res) => {
        History.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({count:val.length});
            }
        })
    })


module.exports = router