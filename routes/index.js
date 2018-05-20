var checkAuth = require('../middleware/checkAuth');

module.exports = function(app){

  app.get('/', require('./frontpage').get);

  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);

  app.post('/logout', require('./logout').post);

  app.get('/register', require('./register').get);
  app.post('/register', require('./register').post);

  app.get('/pedia', checkAuth, require('./pedia').get);
  app.post('/pedia', checkAuth, require('./pedia').post);

  app.get('/editor', checkAuth, require('./editor').get);
  app.post('/editor', checkAuth, require('./editor').post);

  app.get('/articles/:uid', checkAuth, require('./article').get);
  app.post('/article', require('./article').post);

  app.get('/user/:uid', checkAuth, require('./userInfo').get);
  
  app.post('/edit', require('./edit').post);

  app.get('/users', checkAuth, require('./users').get);
  app.post('/users', checkAuth, require('./users').post);
}
