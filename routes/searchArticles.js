const Article = require('../models/article').Article;

exports.post = function(req, res, next) {
    var search = req.body.searchtext;
    var cursor = Article.find({"name": { "$regex": search, "$options": "i" }}).cursor();
    var arr = Array();
    cursor.on('data', function(doc) {
       arr.push(doc);
      });
    cursor.on('end', function() {
      res.render('pedia', {arr: arr}, function(err, html) {
        if (err) throw err;
        res.send(html);
      });
    });
};