---
sidebar_position: 2
---

# Relations

Assume we have models `user`,`user detail` and `program` :

```ts
@EzModel()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@EzModel()
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;
}

@EzModel()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

## One to One relations

To create a one-to-one relation between User and the User Details we can add the following to our User model:

```ts title="User Model"
@EzModel()
export class User {
  .
  .
  @OneToOne(type => UserDetail)
  @JoinColumn()
  detail: UserDetail
}
```

Each of the added decorators performs a different functionality:

`@OneToOne` - Specifies that a User has one User Details and vice versa

`@JoinColumn` - Specifies that the User model contains the User Details **foreign key**

A more detailed explanation can be found [here](https://typeorm.io/#/one-to-one-relations)

## One to Many relations

To create a one-to-many relation between program and users we can add the following to our models:

```ts title="User and Program Models"
@EzModel()
export class Program {
  .
  .
  @OneToMany(() => User, user=>user.program)
  users: user[]
}

@EzModel()
export class User {
  .
  .
  @ManyToOne(() => Program, program=>program.users)
  program: Program
}
```

Each of the added decorators performs a different functionality:

For one-to-many relations, you must define both 

`@OneToMany` - Put this on the model where that is the 'one'

`@ManyToOne` - Put this on the model where that is the 'many'

A more detailed explanation can be found [here](https://typeorm.io/#/many-to-one-one-to-many-relations)

## Many to Many relations

To create a many-to-many relation between programs and users we can add the following to our models:

```ts title="User and Program Models"
@EzModel()
export class Program {
  .
  .
  //No need anything here
}

@EzModel()
export class User {
  .
  .
  @ManyToMany(() => Program)
  @JoinTable()
  program: Program
}
```

For Many to Many relations you need the following:

`@ManyToMany` - Specifies a Program has many Users and vice versa

`@JoinTable` - Specifies that the foreign key to the join table is on this side of the relation

A more detailed explanation can be found [here](https://typeorm.io/#/many-to-many-relations)

## Nested Creation

For nested creation to work, we need to enable cascade creation. We can do so by adding `cascade:true`

```ts title="User Model"
@EzModel()
export class User {
  .
  .
  @OneToOne(type => UserDetail, {
      cascade: true
  })
  .
  .
}
```

We can test all our endpoints at the [generated docs](http://localhost:8888/docs)

We can 
1. Click on the `POST` request for the url `/User/`
2. Click on `Try it out`
3. Use the following request body:

```json
{ "name": "Robert", "detail": { "age": 70 } }
```

Now we can get all the Users using the `GET` request for `/User/` to obtain:
```json
[
  {
    "id": 1,
    "name": "Robert"
  }
]
```

And all the user details with the `GET` request for `/UserDetail/`
```json
[
  {
    "id": 1,
    "age": 70
  }
]
```

## Nested Read

Right now we notice that the returned user does not come with his user details. However, if we want to return the nested field we can add `eager:true`

```ts title="User Model"
@EzModel()
export class User {
  .
  .
  @OneToOne(type => UserDetail, {
      cascade: true,
      eager: true
  })
  .
  .
}
```

Now, when we get the parents we have:
```json
[
  {
    "id": 1,
    "name": "Robert",
    "detail": {
      "id": 1,
      "age": 70
    }
  }
]
```

## Updating by ID

Let's say we create the user details seperately with

```json
{"age":24}
```

And a user,

```json
{"name":"Rebecca"}
```

To update by the user's account by ID, we have to make a reference to the `foreign key` that typeorm automatically generates.

We can do this by adding the column `detailId`
```ts title="User Model"
@EzModel()
export class User {
  .
  .
  @OneToOne(type => UserDetail)
  @JoinColumn()
  detail: UserDetail

  @Column({
      nullable:true
  })
  detailId: number
}
```

Now we can update the user with her detail's id by using the `PATCH` request using the user's `id`

```json
{"detailId" : 1}
```

Now if we obtain all the parents, we find that the user now has her details

```json
[
  {
    "id": 1,
    "name": "Rebecca",
    "baby": {
      "id": 1,
      "age": 24
    },
    "babyId": 1
  }
]
```

## Nested Delete

When we remove a user, by default, the database throws an error if their details still exist. If we want to make deleting the User deletes the User Details, we can use

```ts title="User Model"
@EzModel()
export class User {
  .
  .
  @OneToOne(type => UserDetail, {
      onDelete: 'CASCADE'
  })
  .
  .
}
```

## Nested Functionality
All routes support nested functionality with relations. You can configure the nested functionality in the `options` of your relation

```ts title="User and Program Example" {9-12}
@EzModel()
export class User {
  ...
}

@EzModel()
export class Program {
  @OneToMany(type => User, user => user.program,{
    eager: (true | false),
    cascade: (true | false | ['insert','update','remove']),
    onDelete: ("RESTRICT" | "CASCADE" | "SET NULL" | "DEFAULT" | "NO ACTION"),
    onUpdate: ("RESTRICT" | "CASCADE" | "SET NULL" | "DEFAULT")
  })
  users: User[];
}
```

<!-- TODO: Make the full list more comprehensive, and check that the descriptions are correct -->

|Option|Description|default value|
|-|-|-|
|eager|*Loads* the nested data on `GET` if true|`false`|
|cascade|*Updates* the nested data on `PATCH` if true|`false`|
|onDelete `RESTRICT`|*Restricts Delete* if nested data exists|`RESTRICT`| 
|onDelete `CASCADE`|*Deletes Nested data* if nested data exists|`RESTRICT`| 

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
