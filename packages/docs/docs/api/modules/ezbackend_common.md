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
- [EzModelRepo](../classes/_ezbackend_common.EzModelRepo)
- [EzRouter](../classes/_ezbackend_common.EzRouter)

## Interfaces

- [GenerateOpts](../interfaces/_ezbackend_common.GenerateOpts)
- [RouterOptions](../interfaces/_ezbackend_common.RouterOptions)

## Type aliases

### FullType

Ƭ **FullType**: `NormalType` \| `RelationType` \| `NestedNormalType` \| `NestedRelationType`

#### Defined in

[packages/common/src/model/model.ts:32](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L32)

___

### Middleware

Ƭ **Middleware**: (`oldRoute`: `RouteOptions`) => `RouteOptions`

#### Type declaration

▸ (`oldRoute`): `RouteOptions`

##### Parameters

| Name | Type |
| :------ | :------ |
| `oldRoute` | `RouteOptions` |

##### Returns

`RouteOptions`

#### Defined in

[packages/common/src/model/generators/api-generator.ts:48](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/api-generator.ts#L48)

___

### ModelOpts

Ƭ **ModelOpts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `repoOpts?` | [`RepoOptions`](_ezbackend_common#repooptions) |
| `routerOpts?` | [`RouterOptions`](../interfaces/_ezbackend_common.RouterOptions) |

#### Defined in

[packages/common/src/model/model.ts:177](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L177)

___

### ModelSchema

Ƭ **ModelSchema**: `Object`

#### Index signature

▪ [index: `string`]: [`FullType`](_ezbackend_common#fulltype)

#### Defined in

[packages/common/src/model/model.ts:38](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L38)

___

### RepoOptions

Ƭ **RepoOptions**: `Omit`<`EntitySchemaOptions`<`any`\>, ``"name"`` \| ``"columns"`` \| ``"relations"``\>

#### Defined in

[packages/common/src/model/model.ts:43](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L43)

___

### Type

Ƭ **Type**: `RelationType` \| `NormalType`

#### Defined in

[packages/common/src/model/model.ts:26](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L26)

## Variables

### Type

• **Type**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BOOL` | `BOOL` |
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

[packages/common/src/model/model.ts:27](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L27)

## Functions

### buildRoutePrefix

▸ **buildRoutePrefix**(`instancePrefix`, `pluginPrefix`): `string`

Use this for building route prefixes.
Pass in the instance and plugin prefix to generate a proper route prefix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instancePrefix` | `string` |
| `pluginPrefix` | `string` |

#### Returns

`string`

#### Defined in

[packages/common/src/model/generators/api-generator.ts:24](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/api-generator.ts#L24)

___

### convert

▸ **convert**(`meta`, `prefix?`): `Object`

Top-level function to convert {@link EntityMetaData} from typeOrm to {@link jsonSchema} format to return the {@link createSchema}, {@link createSchema}, and {@link fullSchema}

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

[packages/common/src/model/typeorm-json-schema/index.ts:290](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/typeorm-json-schema/index.ts#L290)

___

### generateRouteFactory

▸ **generateRouteFactory**(`genOpts`, `generator`, `middlewares?`): (`instance`: `any`, `opts`: `any`) => `Promise`<`void`\>

Factory function for generating routes.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `genOpts` | `any` | `undefined` |
| `generator` | `any` | `undefined` |
| `middlewares` | [`Middleware`](_ezbackend_common#middleware)[] | `[]` |

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

[packages/common/src/model/generators/api-generator.ts:58](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/api-generator.ts#L58)

___

### getCreateSchema

▸ **getCreateSchema**(`meta`, `prefix?`): `Object`

 Retrives JSON Schema for POST requests for given metadata and prefix

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

[packages/common/src/model/typeorm-json-schema/index.ts:148](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/typeorm-json-schema/index.ts#L148)

___

### getDefaultGenerators

▸ `Const` **getDefaultGenerators**(): `Object`

Generates API Documentation for the current model
{@link createOne} - Generates API docs for a POST request for one entity
{@link getOne} - Generates API docs for a GET request for one entity
{@link getAll} - Generates API docs for a GET request for all entities the model
{@link udpateOne} - Generates API docs for a PATCH request to one entity
{@link deleteOne} - Generates API docs for a DELETE request for one entity

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

[packages/common/src/model/generators/default-generators.ts:46](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/default-generators.ts#L46)

___

### getFullSchema

▸ **getFullSchema**(`meta`, `prefix?`): `Object`

Retrives full JSON Schema for PATCH requests for given metadata and prefix.
Note: This also the schema used for the database ui.

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

[packages/common/src/model/typeorm-json-schema/index.ts:215](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/typeorm-json-schema/index.ts#L215)

___

### getPrimaryColName

▸ **getPrimaryColName**(`meta`): `string`

Returns the primary column name from given metadata

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` |

#### Returns

`string`

#### Defined in

[packages/common/src/model/generators/default-generators.ts:11](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/default-generators.ts#L11)

___

### getRoutePrefix

▸ **getRoutePrefix**(`prefixes`): `string`

getRoutePrefix

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefixes` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/common/src/model/generators/api-generator.ts:44](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/api-generator.ts#L44)

___

### getSchemaName

▸ **getSchemaName**(`meta`, `type`, `prefix?`): `string`

Retrieves the schema name for given metadata, type, and prefix

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `EntityMetadata` \| `RelationMetadata` |
| `type` | ``"createSchema"`` \| ``"updateSchema"`` \| ``"fullSchema"`` |
| `prefix?` | `string` |

#### Returns

`string`

#### Defined in

[packages/common/src/model/typeorm-json-schema/index.ts:13](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/typeorm-json-schema/index.ts#L13)

___

### getUpdateSchema

▸ **getUpdateSchema**(`meta`, `prefix?`): `Object`

Retrives JSON Schema for PATCH requests for given metadata and prefix

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

[packages/common/src/model/typeorm-json-schema/index.ts:98](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/typeorm-json-schema/index.ts#L98)

___

### isNestedNormalType

▸ **isNestedNormalType**(`type`): type is NestedNormalType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FullType`](_ezbackend_common#fulltype) |

#### Returns

type is NestedNormalType

#### Defined in

[packages/common/src/model/model.ts:95](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L95)

___

### isNestedRelation

▸ **isNestedRelation**(`type`): type is NestedRelationType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FullType`](_ezbackend_common#fulltype) |

#### Returns

type is NestedRelationType

#### Defined in

[packages/common/src/model/model.ts:87](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L87)

___

### isNormalType

▸ **isNormalType**(`type`): type is NormalType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FullType`](_ezbackend_common#fulltype) |

#### Returns

type is NormalType

#### Defined in

[packages/common/src/model/model.ts:91](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L91)

___

### isRelation

▸ **isRelation**(`type`): type is RelationType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FullType`](_ezbackend_common#fulltype) |

#### Returns

type is RelationType

#### Defined in

[packages/common/src/model/model.ts:83](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/model.ts#L83)

___

### middlewareFactory

▸ **middlewareFactory**(`optName`, `newValue`): [`Middleware`](_ezbackend_common#middleware)

#### Parameters

| Name | Type |
| :------ | :------ |
| `optName` | `string` |
| `newValue` | `any` |

#### Returns

[`Middleware`](_ezbackend_common#middleware)

#### Defined in

[packages/common/src/model/generators/api-generator.ts:72](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/model/generators/api-generator.ts#L72)
