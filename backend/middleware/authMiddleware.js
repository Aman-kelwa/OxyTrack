const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = protect;
