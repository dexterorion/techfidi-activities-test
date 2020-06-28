## Techifidi test case

- This project aims to show some habilities for a full-stack position

### Pre-requisites

- Node (I am using v12.18.1)
- NPM (I am using 6.14.5)
- MySQL (I am using 8.0.2)

### UI

    First of all, navigate to the directory `ui` and run `npm install`

    Serve 
        - To start the project, run `npm run serve`
        - It should start on `localhost:8080`

    Test
        - To test the project, run `npm test`

### API

    - First of all, navigate to the directory `api` and run `npm install`
    - Set the right connections config to connect to MySQL (for `test` and `development` environments)
    - Create the database for each environment (default to `development_database` and `test_database`)
    - Migrate (create tables) for `development` environment: `node_modules\.bin\sequelize db:migrate --env development`
    - Migrate (create tables) for `test` environment: `node_modules\.bin\sequelize db:migrate --env test`
       
    Serve
        - To start the project, run `npm start`
        - It should start on `localhost:3000`

    Test
        - To test the project, run `npm test`

### OBS
    - Sometimes, jest just doesn't install properly, so if some error happens, just install globally with `npm install -g jest`