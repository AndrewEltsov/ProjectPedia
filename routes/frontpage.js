exports.get = function(req, res) {
  if (req.session.user){
    res.redirect('/pedia');
  } else {
    res.redirect('/login');
  }
};
