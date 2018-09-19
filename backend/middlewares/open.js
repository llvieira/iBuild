
module.exports = (req, res, next) => {
  if (req.path === '/' && req.method === 'POST') {
    next('router');
  } else {
    next();
  }
};