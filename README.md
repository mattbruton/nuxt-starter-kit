# nuxt-starter-kit

> Starter Kit for Nuxt

## Build Setup
``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at https://localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack
We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).

##PassportJS JWT
Run `npm run dev` and open make a post request with username and password to `https://localhost:3001/api/token`.  This will return your token.  Then make a get request to `https://localhost:3001/api/v1/users` with the Authorization header set to the token you received from the last endpoint.  This will give you the list of users.  If you try to hit the users endpoint without the token it will return a 401 status.