# Seal the Deal

Seal the Deal är en webbutik där användare kan "köpa" sälar. Det är en lekfull e-handel byggd som inlämningsuppgift i kursen Gränssnittsutveckling. Applikationen består av en frontend i React/Vite och en backend i Node.js/Express som kopplas mot en MongoDB-databas.

Sidan finns live på https://seal-webbshop.onrender.com.

## Teknik

Frontenden bygger på React, Vite och React Router. Backenden är skriven i Node.js med Express, använder JWT för autentisering och bcrypt för lösenordshashning. Databasen är MongoDB via Mongoose. Hela applikationen är driftsatt på Render (frontenden som Static Site och backenden som Web Service), och databasen ligger i MongoDB Atlas.

## Mappstruktur

Projektet är uppdelat i två delar: **seal-webbshop** för frontenden och **seal-backend** för backenden.

I **seal-webbshop** ligger frontenden, med följande mappar under src:

- **api** innehåller vanliga async-funktioner mot backenden, till exempel inloggning
- **components** innehåller återanvändbara komponenter som Header, Footer och SealCard
- **context** innehåller global state via Context API (Auth, Cart och Favs)
- **hooks** innehåller custom hooks och övriga API-anrop, till exempel useSeals och useOrders
- **pages** innehåller sidkomponenterna, till exempel Home, SealList och Checkout

I **seal-backend** ligger backenden, uppdelad i:

- **config** för databas-anslutningen
- **controllers** med logiken bakom varje route
- **middleware** för verifyToken och optionalAuth
- **models** med Mongoose-modellerna för User, Seal och Order
- **routes** med Express-routes för /auth, /seals, /orders och /favorites
- **scripts** med hjälpscript, till exempel för att nollställa sälar i databasen

## Kom igång lokalt

Du behöver ha Node.js installerat samt en .env-fil i varje mapp (bifogas vid inlämningen).

Starta backenden genom att navigera till mappen **seal-backend**, köra npm install och sedan npm run dev. Backenden startar på localhost:5000.

I ett separat terminalfönster, navigera till **seal-webbshop**, kör npm install och därefter npm run dev. Frontenden startar på localhost:5173.

## Testkonto

För att testa funktioner som kräver inloggning (favoriter och orderhistorik) kan du logga in med:

- E-post: user@mail.se
- Lösenord: password

Du kan även handla som gäst utan att logga in, eller registrera ett eget konto.
