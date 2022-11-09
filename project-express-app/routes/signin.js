var expressFunction = require('express'); //object to call
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = expressFunction.Router();

const key = 'MY_KEY'

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

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare'))
            } else {
                resolve({ status: data });
            }
        })
    });
}

const findUser = (username) => {
    return new Promise((resole, reject) => {
        User.findOne({ username: username }, (err, data) => {
            if (err) {
                reject(new Error('Cannot find username!'));
            } else {
                if (data) {
                    resole({
                        id: data._id, username: data.username, password: data.password,
                        picture: data.picture, title: data.title, name: data.name, sex: data.sex,
                        birthyear: data.birthyear,
                        phonenumber: data.phonenumber,
                        email: data.email
                    })
                } else {
                    reject(new Error('Cannot find username!'));
                }
            }
        })
    })
}

router.route('/signin')
    .post(async (req, res) => {
        const payload = {
            username: req.body.username,
            password: req.body.password
        };

        console.log(payload);

        try {
            const result = await findUser(payload.username);
            const loginStatus = await compareHash(payload.password, result.password);
            const status = loginStatus.status;
            const signemail = {email: result.email};

            if (status) {
                const token = jwt.sign(signemail, key, { expiresIn: 60 * 15 });
                res.status(200).json({ result, token, status });
                console.log("email = "+signemail)
            } else {
                res.status(200).json({ status });
            }

        } catch (error) {
            res.status(404).send(error);
        }
    })


module.exports = router