const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["Authorization"].split(" ")[1];
  if (token) {
    jwt.verify(token, "mysecret", (err, payload) => {
      if (err) {
        res.send({ msg: "Invalid Token" });
      } else {
        req.user = payload.id;
        next();
      }
    });
  } else {
    res.send({ msg: "You must be authenticated!" });
  }
}

module.exports = auth;
