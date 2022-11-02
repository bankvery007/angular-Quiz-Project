var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const authorization = require('../config/authorize')

var Schema = require("mongoose").Schema;

const CommentSchema = Schema({
    owner: String,
    comment: String,
}, {
    collection: 'comment'
});

let Comment
try {
    Comment = mongoose.model('comment')
} catch (error) {
    Comment = mongoose.model('comment', CommentSchema);
}


// Add New Quiz
const addComment = (CommentData) => {
    return new Promise((resolve, reject) => {
        var new_comment = new Comment({
            owner: CommentData.owner,
            comment: CommentData.comment,
        });
        new_comment.save((err, data) => {
            if (err) {
                reject(new Error('Cannot add comment to DB!'));
            } else {
                resolve({ message: 'Add comment successfully' });
            }
        });
    });
}

router.route('/addComment')
    .post((req, res) => {
        const payload = {
            owner: req.body.owner,
            comment: req.body.comment,
        }
        console.log(payload);
        addComment(payload)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    });

// Get Comment
router.route('/getComment')
    .get((req, res) => {
        Comment.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(val);
            }
        })
    })

module.exports = router