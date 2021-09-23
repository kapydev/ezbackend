---
id: "_ezbackend_core.EzBackend"
title: "Class: EzBackend"
sidebar_label: "EzBackend"
custom_edit_url: null
---

[@ezbackend/core](../modules/_ezbackend_core).EzBackend

## Constructors

### constructor

• **new EzBackend**()

#### Defined in

[core/src/ezbackend.ts:114](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L114)

## Properties

### config

• **config**: [`IEzbConfig`](../interfaces/_ezbackend_core.IEzbConfig)

#### Defined in

[core/src/ezbackend.ts:108](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L108)

___

### plugins

• **plugins**: [`IEzbPlugins`](../modules/_ezbackend_core#iezbplugins)

#### Defined in

[core/src/ezbackend.ts:107](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L107)

___

### instance

▪ `Static` `Private` **instance**: [`EzBackend`](_ezbackend_core.EzBackend)

#### Defined in

[core/src/ezbackend.ts:110](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L110)

___

### manager

▪ `Static` `Private` **manager**: `Avvio`<[`EzBackend`](_ezbackend_core.EzBackend)\>

#### Defined in

[core/src/ezbackend.ts:111](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L111)

## Methods

### app

▸ `Static` **app**(): [`EzBackend`](_ezbackend_core.EzBackend)

#### Returns

[`EzBackend`](_ezbackend_core.EzBackend)

#### Defined in

[core/src/ezbackend.ts:141](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L141)

___

### initializeApp

▸ `Static` **initializeApp**(): `void`

#### Returns

`void`

#### Defined in

[core/src/ezbackend.ts:134](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L134)

___

### start

▸ `Static` **start**(`configPath?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[core/src/ezbackend.ts:146](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L146)
