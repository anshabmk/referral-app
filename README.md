# Referral App

## Getting started

### Pre-requisities

- Ruby version: 3.0.1
- Rails version: 7.0.4.3
- MySQL version: 8.0.32
- Node.js version: 19.0.1

### Setting up the project for development

1. Clone the repository
```
$ git clone git@github.com:anshabmk/referral-app.git && cd referral-app/
```

2. Install dependencies

Make sure you have supplied database credentials in database.yml before this step!
```
$ bin/setup
```

3. Run server (Rails & React)

Copy `.env.sample` file to `.env` and provide actual values for the environment variables before proceeding!
```
$ bin/dev
```
