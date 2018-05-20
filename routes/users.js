var User = require('../models/user').User;

exports.get = function(req, res) {
  var search = "";
  if (req.query.searchtext){
    search = req.query.searchtext;
  }
  var cursor = User
      .find({"username": { "$regex": search, "$options": "i" }})
      .cursor();
  var arr = Array();
  cursor.on('data', function(doc) {
    arr.push(doc);
  });
  cursor.on('end', function() {
    res.render('users', {arr: arr});
  });
};

  exports.post = function(req, res) {
    var username = req.body.name;
    var priviledge = req.body.priviledge;
    User.findOneAndUpdate({username: username}, {priviledge: priviledge}, function(err, doc, result){
        if (err) throw err;
        res.send({});
    });
};