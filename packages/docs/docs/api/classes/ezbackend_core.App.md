---
id: "_ezbackend_core.App"
title: "Class: App"
sidebar_label: "App"
custom_edit_url: null
---

[@ezbackend/core](../modules/_ezbackend_core).App

An App is the basic building block for a plugin system, it contains all core and lifecycle methods.

**App Lifecycle**

[setPreInit](_ezbackend_auth.EzAuth#setpreinit) → [setInit](_ezbackend_auth.EzAuth#setinit) → [setPostInit](_ezbackend_auth.EzAuth#setpostinit)

→ [setPreHandler](_ezbackend_auth.EzAuth#setprehandler) → [setHandler](_ezbackend_auth.EzAuth#sethandler) → [setPostHandler](_ezbackend_auth.EzAuth#setposthandler)

→ [setPreRun](_ezbackend_auth.EzAuth#setprerun) → [setRun](_ezbackend_auth.EzAuth#setrun) → [setPostRun](_ezbackend_auth.EzAuth#setpostrun)

## Constructors

### constructor

• **new App**()

#### Defined in

[packages/core/src/app.ts:84](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L84)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, [`App`](_ezbackend_core.App)\>

#### Defined in

[packages/core/src/app.ts:62](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L62)

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:67](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L67)

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:64](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L64)

___

### \_instance

• `Protected` **\_instance**: `Avvio`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Defined in

[packages/core/src/app.ts:72](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L72)

___

### \_name

• `Protected` **\_name**: `string`

#### Defined in

[packages/core/src/app.ts:73](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L73)

___

### \_overrides

• `Protected` **\_overrides**: [`Overrides`](../modules/_ezbackend_core#overrides)

#### Defined in

[packages/core/src/app.ts:75](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L75)

___

### \_parent

• `Protected` **\_parent**: [`App`](_ezbackend_core.App)

#### Defined in

[packages/core/src/app.ts:61](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L61)

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:68](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L68)

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:65](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L65)

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:71](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L71)

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:66](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L66)

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:63](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L63)

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:69](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L69)

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:70](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L70)

___

### \_scope

• `Protected` **\_scope**: [`PluginScope`](../enums/_ezbackend_core.PluginScope)

#### Defined in

[packages/core/src/app.ts:74](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L74)

___

### opts

• **opts**: `any`

#### Defined in

[packages/core/src/app.ts:78](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L78)

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

[packages/core/src/app.ts:347](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L347)

## Accessors

### apps

• `get` **apps**(): `Map`<`string`, [`App`](_ezbackend_core.App)\>

#### Returns

`Map`<`string`, [`App`](_ezbackend_core.App)\>

#### Defined in

[packages/core/src/app.ts:102](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L102)

___

### handler

• `get` **handler**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:104](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L104)

___

### init

• `get` **init**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:103](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L103)

___

### instance

• `get` **instance**(): `Avvio`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Returns

`Avvio`<[`AppInstance`](_ezbackend_core.AppInstance)\>

#### Defined in

[packages/core/src/app.ts:106](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L106)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/core/src/app.ts:107](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L107)

• `set` **name**(`newName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newName` | `string` |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:112](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L112)

___

### overrides

• `get` **overrides**(): [`Overrides`](../modules/_ezbackend_core#overrides)

#### Returns

[`Overrides`](../modules/_ezbackend_core#overrides)

#### Defined in

[packages/core/src/app.ts:110](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L110)

___

### parent

• `get` **parent**(): [`App`](_ezbackend_core.App)

#### Returns

[`App`](_ezbackend_core.App)

#### Defined in

[packages/core/src/app.ts:109](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L109)

___

### run

• `get` **run**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

[packages/core/src/app.ts:105](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L105)

___

### scope

• `get` **scope**(): [`PluginScope`](../enums/_ezbackend_core.PluginScope)

#### Returns

[`PluginScope`](../enums/_ezbackend_core.PluginScope)

#### Defined in

[packages/core/src/app.ts:108](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L108)

• `set` **scope**(`newScope`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newScope` | [`PluginScope`](../enums/_ezbackend_core.PluginScope) |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:117](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L117)

## Methods

### \_setParent

▸ **_setParent**(`app`): `void`

Assigns current app to a parent app.
Note! You can only have a maximum of 1 parent.
EzBackend follows Fastify's encapsulation system. Click [here](https://www.fastify.io/docs/latest/Encapsulation/) for more information on Fastify's encapsulation

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`App`](_ezbackend_core.App) |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:227](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L227)

___

### addApp

▸ **addApp**(`name`, `newApp`, `opts?`): `void`

Creates a new app
Note! You cannot have an app with the same name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `newApp` | [`App`](_ezbackend_core.App) |  |
| `opts` | `any` | options |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:242](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L242)

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

[packages/core/src/app.ts:252](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L252)

___

### getHookPlugin

▸ **getHookPlugin**(`lifecycle`): [`PluginType`](../modules/_ezbackend_core#plugintype)

Retrieves the function assigned to the lifecycle method for the current app

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | [`Lifecycle`](../modules/_ezbackend_core#lifecycle) |

#### Returns

[`PluginType`](../modules/_ezbackend_core#plugintype)

#### Defined in

[packages/core/src/app.ts:261](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L261)

___

### removeHook

▸ **removeHook**(`lifecycle`, `funcName`): `void`

Removes a previously added function from a lifecycle method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lifecycle` | [`Lifecycle`](../modules/_ezbackend_core#lifecycle) | Lifecycle where function was added |
| `funcName` | `string` | Name of function that was added |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:198](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L198)

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

[packages/core/src/app.ts:336](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L336)

___

### setHandler

▸ **setHandler**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setHandler](_ezbackend_auth.EzAuth#sethandler) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:157](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L157)

___

### setHook

▸ **setHook**(`lifecycle`, `funcName`, `plugin`): `void`

Helper function for each lifecycle method to set it's argument functions as hooks in the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lifecycle` | [`Lifecycle`](../modules/_ezbackend_core#lifecycle) | Point in the lifecycle to place the function |
| `funcName` | `string` | Name of function to be placed |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located in |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:212](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L212)

___

### setInit

▸ **setInit**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setInit](_ezbackend_auth.EzAuth#setinit) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:133](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L133)

___

### setPostHandler

▸ **setPostHandler**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setPostHandler](_ezbackend_auth.EzAuth#setposthandler) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:165](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L165)

___

### setPostInit

▸ **setPostInit**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setPostInit](_ezbackend_auth.EzAuth#setpostinit) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:141](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L141)

___

### setPostRun

▸ **setPostRun**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setPostRun](_ezbackend_auth.EzAuth#setpostrun) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:189](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L189)

___

### setPreHandler

▸ **setPreHandler**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setPreHandler](_ezbackend_auth.EzAuth#setprehandler) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:149](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L149)

___

### setPreInit

▸ **setPreInit**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setPreInit](_ezbackend_auth.EzAuth#setpreinit) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:125](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L125)

___

### setPreRun

▸ **setPreRun**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setPreRun](_ezbackend_auth.EzAuth#setprerun) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:173](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L173)

___

### setRun

▸ **setRun**(`funcName`, `plugin`): `void`

Set's it's argument function as a hook during the [setRun](_ezbackend_auth.EzAuth#setrun) point of the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcName` | `string` | Name of function to be called |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located |

#### Returns

`void`

#### Defined in

[packages/core/src/app.ts:181](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L181)

___

### start

▸ **start**(`opts?`): `Promise`<`void`\>

Starts the app running. You can pass in app options to configure how the app should run

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/core/src/app.ts:312](https://github.com/kapydev/ezbackend/blob/345dd45/packages/core/src/app.ts#L312)
