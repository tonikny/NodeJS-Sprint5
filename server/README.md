# Xat Server 

## Instal·lació
- Instal·lació de llibreries:
  - `npm install`
- Copiar `.env_DIST` a `.env` i configurar connexions a bases de dades i opcions.

## Ús
- `npm start`
- Si es configura per recrear i omplir la bd, es generen dues sales i dos usuaris (user1 i user2 amb password xxx)

## Estructura del projecte

- **app**:
    - **controllers/** - gestió d'e/s 
    - **helpers/**
    - **middlewares/**
    - **models/** - models de classes (esquema Sequelize)
    - **routes/** - gestió de les rutes
    - **services/** - lògica de l'aplicació
- **app.js** - Punt d'entrada a l'aplicació
- **.env_DIST** - template de .env
- **package.json**

## Mòduls NPM necessaris

- Express
- Express-validator
- Dotenv
- Sequelize
- Mysql2
- Mongoose
- Cors
- Jsonwebtoken
- Bcrypt
- Socket.io
