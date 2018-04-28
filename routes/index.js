var checkAuth = require('../middleware/checkAuth');

module.exports = function(app){

  app.get('/', require('./frontpage').get);

  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);

  app.post('/logout', require('./logout').post);

  app.get('/pedia', checkAuth, require('./pedia').get);
  app.post('/pedia', checkAuth, require('./pedia').post);

  app.get('/editor', require('./editor').get);
  app.post('/editor', require('./editor').post);

  app.get('/articles/:uid', require('./article').get);
  app.post('/article', require('./article').post);

  app.post('/edit', require('./edit').post);

  app.get('/users', require('./users').get);

  app.post('/search/articles', require('./searchArticles').post); 
  app.post('/search/users', require('./searchUsers').post);

  app.post('/sort', require('./sort').post);
    
}
