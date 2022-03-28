/* //const authService = require('../services/auth')
const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../config/config");


// Singleton per desar les dades de l'usuari autenticat
class CurrentUser {
  data;
  
  getData() {
    return this.data;
  }

  setData(obj) {
    console.log(obj);
    this.data = Object.assign({}, obj);
  }

  // setDataFromToken(token) {
  //   const d = this.decodeToken(token);
  //   this.data = {userId: d.userId, nom: d.nom, email: d.email};
  // }
  setDataFromToken(token) {
    const d = jwt.decode(token, jwtSecretToken.token);    
    this.data = {userId: d.userId, nom: d.nom, email: d.email};
  }
}

module.exports = new CurrentUser(); */