---
sidebar_label: 'Getting Started'
sidebar_position: 2
---

# Getting Started

A default schema is generated for you. You can edit this schema or create your own. 
Running this will automatically create POST, GET, PUT, and DELETE endpoints that you can test on [localhost:8888/docs](http://localhost:8888/docs/static/index.html)

```ts title=".ezb/index.ts"
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { EzModel } from "@ezbackend/common";

@EzModel()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number
}

@EzModel()
export class Pets {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  species: string
}
```

You can also make your own [custom endpoints](tutorial-basics/create-a-route)

