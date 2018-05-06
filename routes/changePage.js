const Article = require('../models/article').Article;

exports.post = function(req, res, next) {
    var arr = req.body.arr;
    var page = req.body.page;
    
    console.log(arr);
    var count = Math.ceil(arr.length / 10);
        res.render('pedia', {arr: arr, pagecount: count, page: page}, function(err, html) {
            if (err) throw err;
            res.send(html);
    });
};