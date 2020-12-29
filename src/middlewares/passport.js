const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.send({
    "status": 403,
    "message": "access denied"
  });

  try {
    const verified = jwt.verify(JSON.parse(token), 'jseohfn');
    req.user = verified;
    next();
  } catch (err) {
    res.send({
      "status": 401,
      "message": "invalid token"
    })
  }
}
