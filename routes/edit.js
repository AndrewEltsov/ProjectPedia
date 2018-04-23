const Article = require('../models/article').Article;

exports.post = function(req, res, next) {
    var path = req.body.path;
    var fs = require('fs');
    var path = req.body.path;
    Article.findOne({path: path}, function(err, article){
      if (err) throw err;
      fs.open('.'+path, 'r', function(err, fd){
        if (err) throw err;
        fs.readFile(fd, function (err, data) {
          if (err) throw err;
          res.render('editor', {name: article.name, doc: data, mode: 'readonly'}, function(err, html) {
            if (err) throw err;
            res.send(html);
        });
      });
    })  
  })
};