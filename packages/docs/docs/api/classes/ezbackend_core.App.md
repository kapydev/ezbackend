---
id: "_ezbackend_core.App"
title: "Class: App"
sidebar_label: "App"
custom_edit_url: null
---

[@ezbackend/core](../modules/_ezbackend_core).App

## Constructors

### constructor

• **new App**()

#### Defined in

[packages/core/src/app.ts:71](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L71)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, [`App`](_ezbackend_core.App)\>

#### Defined in

[packages/core/src/app.ts:49](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L49)

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:54](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L54)

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:51](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L51)

___

### \_instance

• `Protected` **\_instance**: `Avvio`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Defined in

[packages/core/src/app.ts:59](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L59)

___

### \_name

• `Protected` **\_name**: `string`

#### Defined in

[packages/core/src/app.ts:60](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L60)

___

### \_overrides

• `Protected` **\_overrides**: [`Overrides`](../modules/_ezbackend_core#overrides)

#### Defined in

[packages/core/src/app.ts:62](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L62)

___

### \_parent

• `Protected` **\_parent**: [`App`](_ezbackend_core.App)

#### Defined in

[packages/core/src/app.ts:48](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L48)

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:55](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L55)

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:52](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L52)

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:58](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L58)

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:53](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L53)

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:50](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L50)

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:56](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L56)

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:57](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L57)

___

### \_scope

• `Protected` **\_scope**: [`PluginScope`](../enums/_ezbackend_core.PluginScope)

#### Defined in

[packages/core/src/app.ts:61](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L61)

___

### opts

• **opts**: `any`

#### Defined in

[packages/core/src/app.ts:65](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L65)

___

### override

• `Protected` **override**: (`server`: `mixedInstance`<[`AppInstance`](_ezbackend_core.AppInstance)\>, `fn`: `Plugin`<`any`, [`AppInstance`](_ezbackend_core.AppInstance)\>, `options`: `any`) => `mixedInstance`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Type declaration

▸ (`server`, `fn`, `options`): `mixedInstance`<[`AppInstance`](_ezbackend_core.AppInstance)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `server` | `mixedInstance`<[`AppInstance`](_ezbackend_core.AppInstance)\> |
| `fn` | `Plugin`<`any`, [`AppInstance`](_ezbackend_core.AppInstance)\> |
| `options` | `any` |

##### Returns

`mixedInstance`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Defined in

[packages/core/src/app.ts:222](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L222)

## Accessors

### apps

• `get` **apps**(): `Map`<`string`, [`App`](_ezbackend_core.App)\>

#### Returns

`Map`<`string`, [`App`](_ezbackend_core.App)\>

#### Defined in

[packages/core/src/app.ts:89](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L89)

___

### handler

• `get` **handler**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:91](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L91)

___

### init

• `get` **init**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:90](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L90)

___

### instance

• `get` **instance**(): `Avvio`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Returns

`Avvio`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Defined in

[packages/core/src/app.ts:93](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L93)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/core/src/app.ts:94](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L94)

• `set` **name**(`newName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newName` | `string` |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:99](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L99)

___

### overrides

• `get` **overrides**(): [`Overrides`](../modules/_ezbackend_core#overrides)

#### Returns

[`Overrides`](../modules/_ezbackend_core#overrides)

#### Defined in

[packages/core/src/app.ts:97](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L97)

___

### parent

• `get` **parent**(): [`App`](_ezbackend_core.App)

#### Returns

[`App`](_ezbackend_core.App)

#### Defined in

[packages/core/src/app.ts:96](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L96)

___

### run

• `get` **run**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:92](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L92)

___

### scope

• `get` **scope**(): [`PluginScope`](../enums/_ezbackend_core.PluginScope)

#### Returns

[`PluginScope`](../enums/_ezbackend_core.PluginScope)

#### Defined in

[packages/core/src/app.ts:95](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L95)

• `set` **scope**(`newScope`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newScope` | [`PluginScope`](../enums/_ezbackend_core.PluginScope) |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:104](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L104)

## Methods

### \_setParent

▸ **_setParent**(`app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`App`](_ezbackend_core.App) |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:138](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L138)

___

### addApp

▸ **addApp**(`name`, `newApp`, `opts?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `newApp` | [`App`](_ezbackend_core.App) |
| `opts` | `any` |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:148](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L148)

___

### getApp

▸ **getApp**(`name`): [`App`](_ezbackend_core.App)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |

#### Returns

[`App`](_ezbackend_core.App)

#### Defined in

[packages/core/src/app.ts:159](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L159)

___

### getHookPlugin

▸ **getHookPlugin**(`lifecycle`): [`PluginType`](../modules/_ezbackend_core#plugintype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | [`Lifecycle`](../modules/_ezbackend_core#lifecycle) |

#### Returns

[`PluginType`](../modules/_ezbackend_core#plugintype)

#### Defined in

[packages/core/src/app.ts:163](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L163)

___

### removeHook

▸ **removeHook**(`lifecycle`, `funcName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | [`Lifecycle`](../modules/_ezbackend_core#lifecycle) |
| `funcName` | `string` |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:119](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L119)

___

### setCustomOverride

▸ **setCustomOverride**(`varName`, `override`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `varName` | `string` |
| `override` | (`server`: `Server`<`unknown`\>, `fn`: `Plugin`<`any`, `unknown`\>, `options`: `any`) => `Server`<`unknown`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:218](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L218)

___

### setHandler

▸ **setHandler**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:112](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L112)

___

### setHook

▸ **setHook**(`lifecycle`, `funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | [`Lifecycle`](../modules/_ezbackend_core#lifecycle) |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:128](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L128)

___

### setInit

▸ **setInit**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:109](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L109)

___

### setPostHandler

▸ **setPostHandler**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:113](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L113)

___

### setPostInit

▸ **setPostInit**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:110](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L110)

___

### setPostRun

▸ **setPostRun**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:116](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L116)

___

### setPreHandler

▸ **setPreHandler**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:111](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L111)

___

### setPreInit

▸ **setPreInit**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:108](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L108)

___

### setPreRun

▸ **setPreRun**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:114](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L114)

___

### setRun

▸ **setRun**(`funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:115](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L115)

___

### start

▸ **start**(`opts?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/core/src/app.ts:199](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L199)
