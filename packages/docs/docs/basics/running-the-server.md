---
sidebar_position: 0.8
---

# Running the server

## Recommended Setup

We recommend following the instructions in [Getting Started](../getting-started)

Which creates the following boilerplate

![default-plugins](../assets/default-plugins.png)

```ts
import { EzBackend } from "@ezbackend/common";
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";

const app = new EzBackend();

//---Plugins---
app.addApp("openapi", new EzOpenAPI());
app.addApp("db-ui", new EzDbUI());
app.addApp("cors", new EzCors());
//---Plugins---

app.start();
```
This basic boilerplate comes with three plugins to aid development

|Plugin|Description|Notes|
|-|-|-|
|![db-ui](../assets/ez-db-ui.png)|An all in one interface for <br/>1. Looking at your API endpoints <br/>2. Managing your database<br/>3. Testing your API endpoints|`Requires EzOpenAPI plugin to be used as well`|
|![open-api](../assets/ez-open-api.png)|Automatically generates documentation for your backend||
|![cors](../assets/ez-cors.png)|Plugin for managing CORS, by default accepts requests from anywhere| `Make sure to change cors settings before deployment`|

## Barebones

If you just want a barebones application, you can use the following

```ts
import { EzBackend } from "@ezbackend/common";

const app = new EzBackend();

app.start();
```

:::caution
However, this barebones application does not have alot of the functionality that EzBackend provides to make your life easier.
:::
