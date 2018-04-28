const Article = require('../models/article').Article;

exports.post = function(req, res, next) {
    var sortby = req.body.sortby;
    var order = req.body.order;
    var arr = Array();
    var cursor = Article.
        find({}).
        sort(order+sortby).
        cursor();  
  
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