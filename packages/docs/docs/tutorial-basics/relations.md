---
sidebar_position: 2
---

# Relations

Adding relations is like stealing candy from a baby

Assume we have models `parent` and `baby`:

```ts
@EzModel()
export class Baby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@EzModel()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

## One to One relations

To create a one-to-one relation between parents and the baby we can add the following to our baby model:

```ts title=BabyModel
@EzModel()
export class Parent {
  .
  .
  @OneToOne(type => Baby)
  @JoinColumn()
  baby: Baby
}
```

Each of the added decorators performs a different functionality:

`@OneToOne` - Specifies that a parent has one baby and vice versa
`@JoinColumn` - Specifies that the baby model contains the parent foreign key

A more detailed explanation can be found [here](https://typeorm.io/#/one-to-one-relations)

## Nested Creation

For nested creation to work, we need to enable cascade creation. We can do so by adding `cascade:true`

```ts title=BabyModel
@EzModel()
export class Parent {
  .
  .
  @OneToOne(type => Baby, {
      cascade: true
  })
  .
  .
}
```

We can test all our endpoints at the [generated docs](http://localhost:8888/docs)

We can 
1. Click on the `POST` request for the url `/Parent/`
2. Click on `Try it out`
3. Use the following request body:

```json
{ "name": "Robert", "baby": { "name": "Thomas" } }
```

Now we can get all the parents using the `GET` request for `/Parent` to obtain:
```json
[
  {
    "id": 1,
    "name": "Robert"
  }
]
```

And all the babies with the `GET` request for `/Baby/`
```json
[
  {
    "id": 1,
    "name": "Thomas"
  }
]
```

## Nested Retrieval

Right now we notice that the returned parent does not come with his child. However, if we want to return the nested field we can add `eager:true`

Now, when we get the parents we have:
```json
[
  {
    "id": 1,
    "name": "Robert",
    "baby": {
      "id": 1,
      "name": "Thomas"
    }
  }
]
```

## Updating by ID

Let's say a baby was born, but we did not know the mother yet, by creating a baby with

```json
{"name":"Sarah"}
```

But we managed to get her mother, Rebecca

```json
{"name":"Rebecca"}
```

To update by the mother's account by ID, we have to make a reference to the `foreign key` that typeorm automatically generates.

We can do this by adding the column `babyId`
```ts title=ParentModel
@EzModel()
export class Parent {
  .
  .
  @OneToOne(type => Baby)
  @JoinColumn()
  baby: Baby

  @Column({
      nullable:true
  })
  babyId: number
}
```

```ts title=BabyModel
@EzModel()
export class Parent {
  .
  .
  @OneToOne(type => Baby)
  @JoinColumn()
  baby: Baby
}
```

Now we can update the mother with her baby's id by using the `PATCH` request using the mother's `id`

```json
{"babyId" : 1}
```

Now if we obtain all the parents, we find that Rebecca has been succesfully reunited with her child

```json
[
  {
    "id": 1,
    "name": "Rebecca",
    "baby": {
      "id": 1,
      "name": "Sarah"
    },
    "babyId": 1
  }
]
```

## Nested Delete

Let's say when a parent leaves, her child leaves too. By default, removing the parent from the database does not remove the child, but if we want to make it such that deleting the parent removes the child, we can use

```ts title=BabyModel
@EzModel()
export class Parent {
  .
  .
  @OneToOne(type => Baby, {
      cascade: true
      onDelete: 'CASCADE'
  })
  .
  .
}
```

## Understanding how it works

Oversimplifying, the apis are mapped to the typeorm functions in the following way

|name|url|endpoint|action|
|-|-|-|-|
|create|`/`|`POST`|[save](https://typeorm.io/#/undefined/creating-and-inserting-a-photo-into-the-database)|
|readMany|`/`|`GET`|[find](https://typeorm.io/#undefined/loading-from-the-database)|
|read|`/:id`|`GET`|[findOne](https://typeorm.io/#undefined/loading-from-the-database)|
|update|`/:id`|`PATCH`|[update](https://typeorm.io/#/update-query-builder)|
|delete|`/:id`|`DELETE`|[update](https://typeorm.io/#/delete-query-builder)|

So in order to adjust the functionality of the endpoints, you just need to adjust the functionality of your generated schemas
