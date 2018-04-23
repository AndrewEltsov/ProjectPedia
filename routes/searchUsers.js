const User = require('../models/user').User;

exports.post = function(req, res, next) {
    var search = req.body.searchtext;
    var cursor = User.find({"username": { "$regex": search, "$options": "i" }}).cursor();
    var arr = Array();
    cursor.on('data', function(doc) {
       arr.push(doc);
      });
    cursor.on('end', function() {
      res.render('users', {arr: arr}, function(err, html) {
        if (err) throw err;
        res.send(html);
      });
      });
  };