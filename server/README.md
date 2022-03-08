# Xat Server 

## Instal·lació
- Instal·lació de llibreries:
  - `npm install`
- Copiar `.env_DIST` a `.env` i configurar connexions a bases de dades i opcions.

## Ús
- `npm start`

## Estructura del projecte

- **app**:
    - **databases/** - esquemes de les taules
    - **controllers/** - gestió d'e/s 
    - **helpers/**
    - **middlewares/**
    - **models/** - models de classes
    - **routes/** - gestió de les rutes
    - **services/** - lògica de l'aplicació
- **app.js** - Punt d'entrada a l'aplicació
- **.env_DIST** - template de .env
- **package.json**
- **proves_postman/** - proves de les rutes 

## Proves

## Mòduls NPM necessaris

- Express
- Dotenv
- Sequelize
- Mysql2
- Mongoose
