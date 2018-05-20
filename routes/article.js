var Article = require('../models/article').Article;
var HttpError = require('../error/index').HttpError;

exports.get = function(req, res, next) {
    Article.findOne({path: "/articles/"+req.params.uid}, function(err, article){
      if (err) {
        return next(new HttpError(500, "Ошибка"));
      }
      if (article) {
        res.render('article', {uid: req.params.uid, name: article.name});
      } else {
        return next(new HttpError(404, "Статья не найдена"));
      }        
    })
};

exports.post = function(req, res, next) {
    var fs = require('fs');
    var path = req.body.path;
    Article.findOne({path: path}, function(err, article){
      if (err) throw err;
      fs.open('./'+path, 'r', function(err, fd){
        if (err) throw err;
        fs.readFile(fd, function (err, data) {
          if (err) throw err;
          res.send({name: article.name, text: data});
        })
      })
  })  
  };


