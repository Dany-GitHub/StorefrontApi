# Storefront Backend

## Welcome! 👋

**Thanks for checking out my project ❤**

**Storefront backend project is an api for store**

**Note**

- **Be sure to update you .env file with environment variables**

### Table of contents

- [Overview](#overview)
    - [The Project](#The-Project)

- [My Process](#my-process)
    - [Built with](#built-with)
    - [Scripts to run](#scripts-to-run)
    - [Endpoints](#endpoints)
    - [Dependencies](#dependencies)
    - [Environment Variables](#environment-variables)
    - [Setting Up Database](#setting-up-database)
- [Author](#author)

## Overview

### The Project

You will be able to:

- Create user with first name , last name and password
- Authenticate user to access some routes
- Get user id, first name and last name [Must be Authenticated]
- Get all users' id, first name and lastname [Must be Authenticated]
- Create new product with name, price and category [Must be Authenticated]
- Get product by its id
- Get all products' id, name, price and category
- Get all products in same category
- Get all active orders for user [Must be Authenticated]
- Get all completed orders for user [Must be Authenticated]
- Get top 5 products that got ordered
- Create new order for user [Must be Authenticated]
- Add product to order [Must be Authenticated]

## My Process

### Built with

- **TypeScript**
- **Express**
- **Node**
- **Postgres**

### Scripts to run

- To run _nodemon_

```
  npm run start
```

- To build _TypeScript_

```
  npm run build
```

- To test with _jasmine_

```
  npm run jasmine
```

- To run tsc to build _TypeScript_ and test it with _jasmine_

```
  npm run test 
```

### Endpoints

1. User Routes
    1. A Create route '/api/user' [POST]
    2. An Authenticate route '/api/user/authenticate' [POST]
    3. A Show User route '/api/user/:id' [GET]
    4. A Show all Users route '/api/user' [GET]
2. Product Routes
    1. A Create route '/api/product' [POST]
    2. A Show all route '/api/product' [GET]
    3. A Show product route '/api/product/:id' [GET]
    4. A Show product by category route '/api/product/category/:category' [GET]
3. Order Routes
    1. A Show active orders for user route '/api/orders/:id' [GET]
    2. A Show completed orders for user route '/api/orders/completed/:id' [GET]
    3. A Show top 5 products on got ordered route '/api/orders/top5products' [GET]
    4. An Adding order for user route '/api/orders' [POST]
    5. An Adding Product for order '/api/orders/:id/products' [POST]
4. User Orders Routes
    1. A Show active orders for user route '/api/order-products/:id' [GET]
    2. A Show completed orders for user route '/api/order-products/completed/:id' [GET]
    3. A Show top 5 products route '/api/top5products' [GET]

### Dependencies

- typescript
- Express
- pg
- db-migrate
- db-migrate-pg
- dotenv
- jsonwebtoken
- bcrypt
- jasmine
- jasmine Spec Reporter
- supertest

### Environment Variables

- PORT=3000
- ENV=dev
- POSTGRES_HOST=127.0.0.1
- POSTGRES_PORT=5432
- POSTGRES_DB=store
- POSTGRES_TEST_DB=store_test
- POSTGRES_USERNAME=dany
- POSTGRES_PASSWORD=dany245
- BCRYPT_PASSWORD=Your-bcrypt-password
- SALT_ROUNDS=10
- TOKEN_SECRET=Your-secret-token

### Setting Up Database

1. **Create User**

```postgresql
CREATE USER dany WITH PASSWORD 'dany245';
```

2. **Create Databases**

```postgresql
CREATE DATABASE store;
CREATE DATABASE store_test;
```

3. Grant all privileges to both databases

```postgresql
GRANT ALL PRIVILEGES ON DATABASE store TO dany;
GRANT ALL PRIVILEGES ON DATABASE store_test TO dany
```

## Author

- GitHub - [Ali Ahmed](https://github.com/Dany-GitHub)