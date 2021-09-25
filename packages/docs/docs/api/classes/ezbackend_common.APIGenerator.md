---
id: "_ezbackend_common.APIGenerator"
title: "Class: APIGenerator"
sidebar_label: "APIGenerator"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).APIGenerator

## Constructors

### constructor

• **new APIGenerator**(`repo`, `opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `repo` | `Repository`<`unknown`\> |
| `opts` | `IAPIGeneratorOpts` |

#### Defined in

[common/src/models/generators/api-generator.ts:32](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L32)

## Properties

### generators

• **generators**: `IGenerators`

#### Defined in

[common/src/models/generators/api-generator.ts:20](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L20)

___

### opts

• **opts**: `IAPIGeneratorOpts`

#### Defined in

[common/src/models/generators/api-generator.ts:19](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L19)

___

### repo

• **repo**: `Repository`<`unknown`\>

#### Defined in

[common/src/models/generators/api-generator.ts:18](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L18)

___

### generators

▪ `Static` `Private` **generators**: `IGenerators`

#### Defined in

[common/src/models/generators/api-generator.ts:22](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L22)

## Methods

### generateRoutes

▸ **generateRoutes**(`opts`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts) |

#### Returns

`void`

#### Defined in

[common/src/models/generators/api-generator.ts:38](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L38)

___

### getGenerators

▸ `Static` **getGenerators**(): `IGenerators`

#### Returns

`IGenerators`

#### Defined in

[common/src/models/generators/api-generator.ts:28](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L28)

___

### setGenerator

▸ `Static` **setGenerator**(`generatorName`, `generator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `generatorName` | `string` |
| `generator` | `IGenerator` |

#### Returns

`void`

#### Defined in

[common/src/models/generators/api-generator.ts:24](https://github.com/kapydev/ezbackend/blob/9a94ec3/packages/common/src/models/generators/api-generator.ts#L24)
