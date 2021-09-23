---
id: "_ezbackend_common"
title: "Module: @ezbackend/common"
sidebar_label: "@ezbackend/common"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [APIGenerator](../classes/_ezbackend_common.APIGenerator)
- [EzModelMeta](../classes/_ezbackend_common.EzModelMeta)

## Interfaces

- [GenerateOpts](../interfaces/_ezbackend_common.GenerateOpts)

## Variables

### defaultGenerators

• **defaultGenerators**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `createOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `deleteOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `getAll` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `getOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `updateOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |

#### Defined in

[common/src/models/generators/default-generators.ts:30](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/generators/default-generators.ts#L30)

## Functions

### EzModel

▸ **EzModel**(`modelOpts?`): `ClassDecorator`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelOpts?` | `IEzModelOpts` |

#### Returns

`ClassDecorator`

#### Defined in

[common/src/models/index.ts:15](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/index.ts#L15)

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

[common/src/models/typeorm-json-schema/index.ts:252](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/typeorm-json-schema/index.ts#L252)

___

### default

▸ **default**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |

#### Returns

`void`

#### Defined in

[common/src/init-plugin.ts:8](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/init-plugin.ts#L8)

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

[common/src/models/generators/default-generators.ts:6](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/generators/default-generators.ts#L6)
