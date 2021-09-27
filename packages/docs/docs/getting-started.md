---
sidebar_label: 'Getting Started'
sidebar_position: 2
---

# Getting Started

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

You can also make your own [custom endpoints](tutorial-basics/create-a-route)

