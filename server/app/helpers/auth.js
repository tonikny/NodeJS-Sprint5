const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../config/config");
const currentUser = require('../services/currentuser');
module.exports = checkToken = (token) => {
  try {
    const decoded = jwt.verify(token,
      jwtSecretToken.token
    );
    currentUser.setData({ userId: decoded.userId, nom: decoded.nom, email: decoded.email });
    console.log('helper-checkToken:', decoded.userId, decoded.nom);
    return { userId: decoded.userId, nom: decoded.nom };
  } catch (error) {
    console.log("err", error.message, token);
    return false;
  }

}