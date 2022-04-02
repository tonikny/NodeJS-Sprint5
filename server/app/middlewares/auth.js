const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../config/config");
//const currentUser = require('../services/currentuser');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtSecretToken.token);
        req.user = jwt.decode(token, jwtSecretToken.token);
        console.log('---auth middleware---:', req.user.userId, req.user.nom);
        // currentUser.setData({ userId: req.user.userId, nom: req.user.nom, email: req.user.email });
        next();
    } catch (error) {
        console.log("No token provided", error);
        res.status(401).json({ message: "No token provided" });
    }
};
