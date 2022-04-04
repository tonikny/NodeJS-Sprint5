const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../config/config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtSecretToken.token);
        req.user = jwt.decode(token, jwtSecretToken.token);
        console.log('---auth middleware---:', req.user.userId, req.user.nom);
        next();
    } catch (error) {
        console.log("No token provided", error);
        res.status(401).json({ message: "No token provided" });
    }
};
