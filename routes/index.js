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

  app.post('/edit', require('./edit').post);

  app.get('/users', checkAuth, require('./users').get);

  app.post('/search/articles', require('./searchArticles').post); 
  app.post('/search/users', require('./searchUsers').post);

  app.post('/sort', require('./sort').post);

  app.post('/changePage', require('./changePage').post);
}
