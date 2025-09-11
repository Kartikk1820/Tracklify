const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token;

  if (process.env.NODE_ENV === "production") {
    token = req.cookies?.token;
  }

  // Fallback to Authorization header for dev and compatibility
  if (!token) {
    token = req.header("Authorization")?.replace("Bearer ", "");
  }

  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = auth;
