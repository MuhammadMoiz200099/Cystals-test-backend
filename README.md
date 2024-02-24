# Cystals-test-backend

Backend test for creating an application do the following task.

* CRUD endpoints for the following database schema(“Account”).
* User login endpoint with email and password authentication.
* List of accounts endpoint with result limitation through request.

## Running Locally

Setup .env file locally to hold the port and the DB connection string

```sh
$ git clone https://github.com/MuhammadMoiz200099/Cystals-test-backend.git
$ cd Cystals-test-backend
$ yarn install
$ yarn start
```

The application should be available and running on [localhost:9000](http://localhost:9000/).
Also, having prefix /api/v1.
e.g.
```
    http://localhost:9000/api/v1/<ENDPOINT>
```

