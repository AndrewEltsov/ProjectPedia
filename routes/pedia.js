var log = require('../libs/log')(module);
const Article = require('../models/article').Article;
const User = require('../models/user').User;

exports.get = function(req, res) {
  var sortby;
  var order;
  var search;
  var page;
  var author;
  if (req.query.sortby) {
    sortby = req.query.sortby;
  } else {
    sortby = 'created';
  }

  if (req.query.order) {
    order = req.query.order;
  } else {
    order = '';
  }

  if (req.query.searchtext) {
    search = req.query.searchtext;
  } else {
    search = "";
  }

  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  }

  if (req.query.author) {
    author = req.query.author;
  } else {
    author = "";
  }

  var cursor = Article.
    find({"name": { "$regex": search, "$options": "i" }, "author": { "$regex": author, "$options": "i" }}).
    sort(order+sortby).
    cursor();
  var arr = Array();
  cursor.on('data', function(doc) {
     arr.push(doc);
  });
  cursor.on('end', function() {
    var count = Math.ceil(arr.length / 10);
    res.render('pedia', {arr: arr, pagecount: count, page: page, order: order, sortby: sortby, search: search, author: author});
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

