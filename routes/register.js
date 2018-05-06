var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');
var log = require('../libs/log')(module);

exports.get = function(req, res) {
  res.render('register');
};

exports.post = function(req, res, next) {
    console.log(1);
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function (err, user) {
      if (user) {
        return next(new HttpError(400, "Пользователь с таким именем уже есть"));
      } else {
        var user = new User({username: username, password: password});
        user.save(function(err) {
            if (err) return next(err);
        });
        req.session.user = user._id;
        res.send({});
      }
  });
};