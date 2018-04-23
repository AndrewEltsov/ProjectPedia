
exports.post = function(req, res) {
  req.session.destroy(function(err) {
    res.send({});
});
};