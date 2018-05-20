var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;

exports.get = function(req, res, next) {
    User.findOne({username: req.params.uid}, function(err, result){
        if (err) {
            return next(new HttpError(500, "Ошибка"));
        }
        if (result) {
            res.render('userInfo', {user: result});
        } else {
            return next(new HttpError(404, "Пользователь не найден"));
        } 
    });
};

