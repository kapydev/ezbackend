---
sidebar_position: 2
---

# Types

## Normal Types

Normal types are types of data that are stored in the same table and are not relations.

For example

```ts
const user = new EzModel('User',{
    name: Type.VARCHAR
})
```

|Name|Description|JS Type|Sample
|----|-----------|-------|------|
|Type.VARCHAR|A string|string|`'hello'`|
|Type.INT|An integer|number|`1`|
|Type.FLOAT|A floating point number|number|`1.00`|
|Type.DATE|A date|string|`"2021-08-11T15:36:56.078Z"`|
|Type.JSON|A JS object|object|`{hello:"world"}`|

You may need to specify additional restrictions, for example the maximum length of a name. For example

```ts
const user = new EzModel('User',{
    name: {
        type: Type.VARCHAR,
        length: 50
    }
})
```

EzBackend uses typeorm with [seperate entity definitions](https://typeorm.io/#/separating-entity-definition) under the hood, so all of the [additional options](https://typeorm.io/#/entities/column-options) available in typeorm are also available in EzBackend

## Relation Types

Relation Types are used to reference data from different tables. For relation types it is necessary to specify additional properties so that EzBackend can understand the relationship

For example, in a `ONE_TO_ONE` relation:

```ts
const example = new EzModel('sample',{
    detail: {
        type: Type.ONE_TO_ONE,
        target: 'detail', //Required
        cascade: true, //Optional
        eager: true, //Optional
        joinColumn: true //Optional
    }
})
```

:::info
For a relation `XXX_TO_YYY`

`XXX` - Refers to the current model

`YYY` - Refers to the other model
:::

|Name|Description|JS Type|Sample|Required Properties|Optional Properties
|----|-----------|-------|------|-|-|
|Type.ONE_TO_ONE|A JS object|object|`{hello:"world"}`|`target`  `joinColumn`| `cascade` `eager` `onDelete` `onUpdate`|
|Type.ONE_TO_MANY|A JS object|object|`{hello:"world"}`|`target` `inverseSide`| `cascade` `eager` `onDelete` `onUpdate`|
|Type.MANY_TO_ONE|A JS object|object|`{hello:"world"}`|`target` `inverseSide`|`cascade` `eager` `onDelete` `onUpdate`|
|Type.MANY_TO_MANY|A JS object|object|`{hello:"world"}`|`target` `joinTable`|`cascade` `eager` `onDelete` `onUpdate`|
<!-- URGENT TODO: Double confirm Many-to-Many options -->

Furthermore, some relations have required properties:


### Relation Required Properties

`target` (string) - the `modelName` of the model that is being pointed to, e.g

```ts
const detail = new EzModel('detail',{})

const example = new EzModel('sample',{
    detail: {
        type: Type.ONE_TO_ONE,
        target: 'detail'
    }
})
```

`inverseSide` (string) - the property name on the other model, e.g

```ts
const program = new EzModel('program',{
    participants: { //HERE THE PROPERTY NAME IS PARTICIPANT(S)
        type: Type.ONE_TO_MANY
        target: 'participant',
        inverseSide: 'program'
    }
})

const participant = new EzModel('participant',{
    detail: {
        type: Type.MANY_TO_ONE,
        target: 'program',
        inverseSide: 'participants' //NOTICE THE 'S' IN PARTICIPANTS
    }
})
```

`joinColumn` (boolean) - Specifies that this side of the relation contains the foreign key [explanation](https://typeorm.io/#/relations/joincolumn-options)

`joinTable` (boolean) - Specified that this side of the relation contains the foreign key to a join table [explanation](https://github.com/typeorm/typeorm/blob/master/docs/relations.md#jointable-options)


### Relation Optional Properties

|Option|Description|default value|
|-|-|-|
|eager|*Loads* the nested data on `GET` if true|`false`|
|cascade|*Updates* the nested data on `PATCH` if true|`false`|
|onDelete|*Restricts Delete* if nested data exists|`RESTRICT`| 
|onDelete|*Deletes Nested data* if nested data exists|`RESTRICT`| 