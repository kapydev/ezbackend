---
id: "_ezbackend_common"
title: "Module: @ezbackend/common"
sidebar_label: "@ezbackend/common"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [EzApp](../classes/_ezbackend_common.EzApp)
- [EzBackend](../classes/_ezbackend_common.EzBackend)
- [EzModel](../classes/_ezbackend_common.EzModel)
- [EzRouter](../classes/_ezbackend_common.EzRouter)

## Interfaces

- [GenerateOpts](../interfaces/_ezbackend_common.GenerateOpts)

## Type aliases

### FullType

Ƭ **FullType**: `NormalType` \| `RelationType` \| `NestedNormalType` \| `NestedRelationType`

#### Defined in

[packages/common/src/model/model.ts:31](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/model.ts#L31)

___

### ModelOptions

Ƭ **ModelOptions**: `Omit`<`EntitySchemaOptions`<`any`\>, ``"name"`` \| ``"columns"`` \| ``"relations"``\>

#### Defined in

[packages/common/src/model/model.ts:42](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/model.ts#L42)

___

### ModelSchema

Ƭ **ModelSchema**: `Object`

#### Index signature

▪ [index: `string`]: [`FullType`](_ezbackend_common#fulltype)

#### Defined in

[packages/common/src/model/model.ts:37](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/model.ts#L37)

___

### Type

Ƭ **Type**: `RelationType` \| `NormalType`

#### Defined in

[packages/common/src/model/model.ts:25](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/model.ts#L25)

## Variables

### Type

• **Type**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DATE` | `DATE` |
| `DOUBLE` | `DOUBLE` |
| `FLOAT` | `FLOAT` |
| `INT` | `INT` |
| `JSON` | `JSON` |
| `MANY_TO_MANY` | `MANY_TO_MANY` |
| `MANY_TO_ONE` | `MANY_TO_ONE` |
| `ONE_TO_MANY` | `ONE_TO_MANY` |
| `ONE_TO_ONE` | `ONE_TO_ONE` |
| `REAL` | `REAL` |
| `VARCHAR` | `VARCHAR` |

#### Defined in

[packages/common/src/model/model.ts:26](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/model.ts#L26)

## Functions

### buildRoutePrefix

▸ **buildRoutePrefix**(`instancePrefix`, `pluginPrefix`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instancePrefix` | `string` |
| `pluginPrefix` | `string` |

#### Returns

`string`

#### Defined in

[packages/common/src/model/generators/api-generator.ts:15](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/generators/api-generator.ts#L15)

___

### convert

▸ **convert**(`meta`, `prefix?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` |
| `prefix?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `createSchema` | `Object` |
| `createSchema.$id` | `string` |
| `createSchema.properties` | `Object` |
| `createSchema.type` | `string` |
| `fullSchema` | `Object` |
| `fullSchema.$id` | `string` |
| `fullSchema.properties` | `Object` |
| `fullSchema.type` | `string` |
| `updateSchema` | `Object` |
| `updateSchema.$id` | `string` |
| `updateSchema.properties` | `Object` |
| `updateSchema.type` | `string` |

#### Defined in

[packages/common/src/model/typeorm-json-schema/index.ts:258](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/typeorm-json-schema/index.ts#L258)

___

### generateRouteFactory

▸ **generateRouteFactory**(`genOpts`, `generator`): (`instance`: `any`, `opts`: `any`) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `genOpts` | `any` |
| `generator` | `any` |

#### Returns

`fn`

▸ (`instance`, `opts`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `any` |
| `opts` | `any` |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/common/src/model/generators/api-generator.ts:36](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/generators/api-generator.ts#L36)

___

### getCreateSchema

▸ **getCreateSchema**(`meta`, `prefix?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` |
| `prefix?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `properties` | `Object` |
| `type` | `string` |

#### Defined in

[packages/common/src/model/typeorm-json-schema/index.ts:129](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/typeorm-json-schema/index.ts#L129)

___

### getDefaultGenerators

▸ `Const` **getDefaultGenerators**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `createOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `deleteOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `getAll` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `getOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `updateOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |

#### Defined in

[packages/common/src/model/generators/default-generators.ts:31](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/generators/default-generators.ts#L31)

___

### getFullSchema

▸ **getFullSchema**(`meta`, `prefix?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` |
| `prefix?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `properties` | `Object` |
| `type` | `string` |

#### Defined in

[packages/common/src/model/typeorm-json-schema/index.ts:189](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/typeorm-json-schema/index.ts#L189)

___

### getPrimaryColName

▸ **getPrimaryColName**(`meta`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` |

#### Returns

`string`

#### Defined in

[packages/common/src/model/generators/default-generators.ts:6](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/generators/default-generators.ts#L6)

___

### getRoutePrefix

▸ **getRoutePrefix**(`prefixes`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefixes` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/common/src/model/generators/api-generator.ts:31](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/generators/api-generator.ts#L31)

___

### getSchemaName

▸ **getSchemaName**(`meta`, `type`, `prefix?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` \| `RelationMetadata` |
| `type` | ``"createSchema"`` \| ``"updateSchema"`` \| ``"fullSchema"`` |
| `prefix?` | `string` |

#### Returns

`string`

#### Defined in

[packages/common/src/model/typeorm-json-schema/index.ts:7](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/typeorm-json-schema/index.ts#L7)

___

### getUpdateSchema

▸ **getUpdateSchema**(`meta`, `prefix?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` |
| `prefix?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `properties` | `Object` |
| `type` | `string` |

#### Defined in

[packages/common/src/model/typeorm-json-schema/index.ts:85](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/typeorm-json-schema/index.ts#L85)
