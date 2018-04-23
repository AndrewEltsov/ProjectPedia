var Article = require('../models/article').Article;

exports.get = function(req, res) {
    Article.findOne({path: "/articles/"+req.params.uid}, function(err, article){
        res.render('article', {uid: req.params.uid, name: article.name});
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


