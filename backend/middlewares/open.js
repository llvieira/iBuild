
//TO-DO: Add other open routes
module.exports = (req, res, next) => {
  if (req.path === '/' && req.method === 'POST') {
    next('router');
  } else {
    next();
  }
};