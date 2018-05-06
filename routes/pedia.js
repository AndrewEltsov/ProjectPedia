var log = require('../libs/log')(module);
const Article = require('../models/article').Article;
const User = require('../models/user').User;

exports.get = function(req, res) {
    var cursor = Article.find({}).cursor();
    var arr = Array();
    cursor.on('data', function(doc) {
       arr.push(doc);
      });
    cursor.on('end', function() {
      var count = Math.ceil(arr.length / 10);
      res.render('pedia', {arr: arr, pagecount: count, page: 1});
      });
  };

  exports.post = function(req, res, next) {
    var fs = require('fs');
    var name = req.body.name;
    var user = req.session.user;
    
    Article.findOneAndRemove({name: name}, function (err, res) {
      fs.unlink('.'+res.path, function (err) {
        if (err) throw err;
        console.log('file is deleted');
      });
    });
    res.send({});
  };

