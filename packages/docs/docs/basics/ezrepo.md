---
sidebar_position: 1.1
---

# EzModelRepo

## Overview

The EzModel Repo decorates the instance with the `instance.repo`, which is a [TypeORM Repository](https://typeorm.io/#/working-with-repository)

## Use Case

If you want to create a model in the database, but do not wish to have auto generated routes for it you can use the EzModelRepo

Example:

```ts
const privateModel = new EzModelRepo('PrivateModel', {
  var1: Type.VARCHAR,
  var2: Type.VARCHAR
})

app.addApp('PrivateModel', privateModel, { prefix: 'private-model' })
```

## Adding routes

You can add routes to a EzModelRepo

Example:
```ts
privateModel.setHandler("Add Routes", async (instance, opts) => {
  instance.server.get('/count', async (req, res) => {
    const numModels = await instance.repo.count() //We have access to the repo in the instance
    return {"numPrivateModels":numModels}
  })
})
```
