const User = require('../models/user')
const {deleteUser, updateUser} = require('../utils/user_utilities')

const removeUser = function (req, res) {
    deleteUser(req).exec((err) => {
        if (err) {
            res.status(500)
            res.json({
                error: err
            })
        }
        res.sendStatus(204)
    });
}

const changeUser = function (req,res) {
    if (req.error) {
        res.status (req.error.status)
        res.send(req.error.message)
    } else {
        updateUser(req).exec((err,user) => {
            if (err) {
                res.status(500)
                res.json({
                    error: err
                });
            }
            res.status(200)
            res.json(user);
        })
    }
}

module.exports = {
    removeUser,
    changeUser
};