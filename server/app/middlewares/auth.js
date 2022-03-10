const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../config/config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtSecretToken.token);
        req.user = jwt.decode(token, jwtSecretToken.token);
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};
