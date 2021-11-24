<p align="center">
    <img src="favicon.png" width="200">
</p>
<h2 align="center">Your tech stack in <b>one package</b></h2>
<p align="center">Simplified Backend Setup</p>


</br>

<p align="center">
    <!-- <a href="https://snyk.io/advisor/npm-package/ezbackend"> 
        <img src="https://snyk.io/advisor/npm-package/ezbackend/badge.svg"/>
    </a> -->
    <a href="https://codecov.io/gh/PhilipWee/ezbackend"> 
        <img src="https://codecov.io/gh/PhilipWee/ezbackend/branch/master/graph/badge.svg?token=YZX7TT9XBQ"/>
    </a>
    <br/>
    <br/>
    <a href="https://www.codefactor.io/repository/github/kapydev/ezbackend">
        <img src="https://www.codefactor.io/repository/github/kapydev/ezbackend/badge" alt="CodeFactor" />
    </a>
    <!-- <a> 
        <img src="https://img.shields.io/github/workflow/status/kapydev/ezbackend/Calculate%20Coverage"/>
    </a> -->
    <a> 
        <img src="https://img.shields.io/npms-io/maintenance-score/ezbackend"/>
    </a>
    <a> 
        <img src="https://img.shields.io/github/commit-activity/m/kapydev/ezbackend"/>
    </a>
    <!-- <a>
        <img src="https://snyk.io/test/github/kapydev/ezbackend/badge.svg">
    </a> -->
    <br/>
    <!-- <a> 
        <img src="https://img.shields.io/david/kapydev/ezbackend"/>
    </a> -->
    <a> 
        <img src="https://img.shields.io/npm/dw/ezbackend"/>
    </a>
    <a> 
        <img src="https://img.shields.io/github/issues/kapydev/ezbackend"/>
    </a>
    <a> 
        <img src="https://img.shields.io/github/license/kapydev/ezbackend"/>
    </a>
    <br/>
    <a href="https://www.youtube.com/channel/UCXFyio7c5EWBGLknUJZjIzQ"> 
        <img src="https://img.shields.io/youtube/channel/views/UCXFyio7c5EWBGLknUJZjIzQ?style=social"/>
    </a>
    <a href="https://discord.gg/S4gTjYjkuG"> 
        <img src="https://img.shields.io/discord/882956870527098910?label=Discord&logo=discord&style=social"/>
    </a>
    
</p>



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