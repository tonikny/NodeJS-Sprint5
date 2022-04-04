# Xat Client

## Instal·lació
- Instal·lació de llibreries:
  - `npm install`
- Configurar connexió al servidor a src/environments/environment.ts.

## Ús
- `npm start`
- Accedir a la URL proporcionada amb el navegador

## Estructura del projecte

**src**:
  **app**:
    - **angular-material** - mòdul de gestió de material
    - **auth** - mòdul de autenticació, amb els components de login, registre i usuari
    - **models** - interfaces de dades
    - **shared** - complements d'autenticació
    - **services** - serveis de gestió de l'API i sockets
    - **xat** - component principal del xat
  - **app.component.ts** - Punt d'entrada a l'aplicació
- **environments/environment.ts** - configuració del servidor
- **package.json**

## Mòduls NPM necessaris usats addicionalment als d'Angular

- Ngx-socket-io
- Rxjs
- @angular/material 
