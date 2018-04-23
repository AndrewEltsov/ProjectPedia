var Article = require('../models/article').Article;
var User = require('../models/user').User;

exports.get = function(req, res) {
    res.render('editor', {name: "", doc: "", mode: "required"});
  };

  exports.post = function(req, res, next) {
    var fs = require('fs');
    var head = req.body.head;
    var text = req.body.text;
    var path = '/articles/'+makePath()+'.ejs';

    Article.findOne({name: head}, function(err, article){
      if (!(article)) {
        User.findById(req.session.user, 'username', function (err, user) {
          var newArticle = new Article({name: head, author: user.username, path: path});
          newArticle.save(function(err){
            if (err) throw err;
          });  
        });
      }
    });
    fs.open('.'+path, 'w', function (err, fd) {
      if (err) throw err;
      fs.write(fd, text, function(err, written, string){
        if (err) throw err;
        fs.close(fd, function (err) {
          if (err) throw err;
          res.send({});
        })
      })
    });
};

function makePath() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}