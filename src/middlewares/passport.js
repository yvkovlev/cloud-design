const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).send({
    "status": 403,
    "message": "Access denied"
  });

  try {
    const verified = jwt.verify(token, 'jseohfn');
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      "status": 401,
      "message": "Invalid token"
    })
  }
}
