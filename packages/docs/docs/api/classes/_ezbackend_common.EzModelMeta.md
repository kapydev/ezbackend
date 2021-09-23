---
id: "_ezbackend_common.EzModelMeta"
title: "Class: EzModelMeta"
sidebar_label: "EzModelMeta"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).EzModelMeta

## Hierarchy

- `EzPlugin`<`IEzModelMeta`\>

  ↳ **`EzModelMeta`**

## Constructors

### constructor

• **new EzModelMeta**(`model`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `any` |

#### Overrides

EzPlugin&lt;IEzModelMeta\&gt;.constructor

#### Defined in

[common/src/models/index.ts:61](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/index.ts#L61)

## Properties

### generator

• **generator**: [`APIGenerator`](_ezbackend_common.APIGenerator)

#### Defined in

[common/src/models/index.ts:57](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/index.ts#L57)

___

### manager

• **manager**: `Avvio`<`EzPlugin`<`IEzModelMeta`\>\>

#### Inherited from

EzPlugin.manager

#### Defined in

core/dist/ezbackend.d.ts:34

___

### model

• **model**: `any`

#### Defined in

[common/src/models/index.ts:56](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/index.ts#L56)

___

### plugins

• **plugins**: `IEzPlugins`<`IEzModelMeta`\>

#### Inherited from

EzPlugin.plugins

#### Defined in

core/dist/ezbackend.d.ts:35

___

### repo

• **repo**: `Repository`<`unknown`\>

#### Defined in

[common/src/models/index.ts:59](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/index.ts#L59)

## Methods

### initGenerator

▸ **initGenerator**(): `void`

#### Returns

`void`

#### Defined in

[common/src/models/index.ts:67](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/common/src/models/index.ts#L67)

___

### start

▸ **start**(`opts?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `IEzModelMeta` |

#### Returns

`Promise`<`void`\>

#### Inherited from

EzPlugin.start

#### Defined in

core/dist/ezbackend.d.ts:37
