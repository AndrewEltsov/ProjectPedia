var User = require('../models/user').User;

exports.get = function(req, res) {
    var cursor = User.find({}).cursor();
    var arr = Array();
    cursor.on('data', function(doc) {
       arr.push(doc);
      });
    cursor.on('end', function() {
      res.render('users', {arr: arr});
      });
  };