var async = require('async');
var util = require('util');
var mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;
var log = require('../libs/log')(module);

var schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  author: {
    type: String,
    unique: false,
    required: true
  },
  path: {
    type: String,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.showArticle = function(password) {
    var fs = require('fs');

    var readStream = fs.createReadStream('myfile.txt');
    var hash = crypto.createHash('sha1');
    readStream.on('data', function (chunk) {
        hash.update(chunk);
    });
    readStream.on('end', function () {

    });
};

exports.Article = mongoose.model('Article', schema);

