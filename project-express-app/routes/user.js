var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { rejects } = require('assert');
const authorization = require('../config/authorize')
var Schema = require("mongoose").Schema;
const userSchema = Schema({
    picture: String,
    title: String,
    name: String,
    sex: String,
    birthyear: Number,
    phonenumber: String,
    username: String,
    email: String,
    password: String
}, {
    collection: 'users'
});

let user
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 12);
    return result;
}

const insertUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_user = new User({

            picture: dataUser.picture,
            title: dataUser.title,
            name: dataUser.name,
            sex: dataUser.sex,
            birthyear: dataUser.birthyear,
            phonenumber: dataUser.phonenumber,
            username: dataUser.username,
            email: dataUser.email,
            password: dataUser.password
        });
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert user to DB!'));
            } else {
                resolve({ message: 'Sign up successfully' });
            }
        });
    });
}



router.route('/signup')
    .post(async (req, res) => {
        makeHash(req.body.password)
            .then(hashText => {
                const payload = {
                    picture: req.body.picture,
                    title: req.body.title,
                    name: req.body.name,
                    sex: req.body.sex,
                    birthyear: req.body.birthyear,
                    phonenumber: req.body.phonenumber,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashText,
                }
                var query = User.where({
                    username: req.body.username,
                });
                query.findOne((err, existingUser) => {
                    if (err) {
                        return res.status(422).send(err);
                    }
                    if (existingUser) {
                        return res.status(422).send({
                            error: 'User already exists.'
                        });
                    } else {
                        insertUser(payload)
                            .then(result => {
                                console.log(result);
                                res.status(200).json(result);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                });

            })
            .catch(err => {

            })

    });

//get user
router.route('/getUser')
    .get(authorization, (req, res) => {
        User.find((err, val) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(val);
            }
        })
    })

//get user
router.route('/getUserID/:id')
    .get(authorization, (req, res) => {
        User.findById(req.params.id, function (err, user) {
            res.send(user);
        });
    })


// Patch user
router.route('/patch/:id')
    .patch(authorization, (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((blog) => {
            if (!blog) {
                return res.status(404).send({ error: req.params.id });
            }
            res.send(blog);
        }).catch((error) => {
            res.status(500).send(error);
        })
    });


module.exports = router