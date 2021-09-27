# EzBackend

Simple. Scalable. Secure.

Backend Setup in **two lines of code**

## Installation

Instantiate ezbackend

```
npx ezbackend init <dirname>
```

## Usage

```
npm run ezb
```

## Read the Docs

Get the full details from the [official documentation](https://www.ezbackend.io/docs/intro)

----

## Getting Started

A default schema is generated for you. You can edit this schema or create your own. 
Running this will automatically create POST, GET, PUT, and DELETE endpoints that you can test on [localhost:8888/docs](http://localhost:8888/docs/static/index.html)

```ts title=".ezb/index.ts"
import { EzBackend, EzModel, Type } from "@ezbackend/common";

const app = new EzBackend()

const pets = new EzModel('Pets', {
    name: Type.VARCHAR, //String
    species: Type.VARCHAR,
    age: Type.INT //Integer
})

app.addApp(
    "pets", //Name of App
    pets, //App
    { prefix: "pets" } //URL Prefix
)

app.start()
```

## What it does

1. Looks at schemas inside the generated .ezb folder
1. Automatically generate generic endpoints for each schema
1. Automatically create the tables in SQLite3 in-memory DB
1. Automatically create the documentation for each endpoint
1. Leave you more time to work on the things that actually matter

## How it works

1. It uses [typeorm](https://typeorm.io/) to connect to any typeorm supported DB (Postgres, MySQL, SQLite, etc)
1. It uses [fastify](https://www.fastify.io/) to create the endpoints
1. It uses [fastify swagger](https://github.com/fastify/fastify-swagger) to generate the documentation
1. It uses [fastify passport](https://github.com/fastify/fastify-passport) for authentication

## Planned Features

1. One line file storage
1. One line custom functions (CRON jobs, etc)
1. One click deploy (Server)
1. One click deploy (Serverless)
1. One line GraphQL
1. Database Editor
1. One line client side code
1. Benchmarks (Firebase, AWS Amplify, etc)

## Contact Us

> If you are keen on contributing/using EzBackend contact us at we.are.kapydev@gmail.com
Or submit a pull request to the main repo