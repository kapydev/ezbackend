---
id: "_ezbackend_common.EzApp"
title: "Class: EzApp"
sidebar_label: "EzApp"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).EzApp

## Hierarchy

- `App`

  ↳ **`EzApp`**

  ↳↳ [`EzBackend`](_ezbackend_common.EzBackend)

  ↳↳ [`EzModelRepo`](_ezbackend_common.EzModelRepo)

  ↳↳ [`EzRouter`](_ezbackend_common.EzRouter)

## Constructors

### constructor

• **new EzApp**()

#### Overrides

App.constructor

#### Defined in

[packages/common/src/ezapp.ts:53](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L53)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, `App`\>

#### Inherited from

App.\_apps

#### Defined in

packages/core/dist/app.d.ts:19

___

### \_functions

• `Protected` **\_functions**: `Function`[] = `[]`

#### Defined in

[packages/common/src/ezapp.ts:49](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L49)

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_handler

#### Defined in

packages/core/dist/app.d.ts:24

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_init

#### Defined in

packages/core/dist/app.d.ts:21

___

### \_instance

• `Protected` **\_instance**: `Avvio`<`AppInstance`\>

#### Inherited from

App.\_instance

#### Defined in

packages/core/dist/app.d.ts:29

___

### \_name

• `Protected` **\_name**: `string`

#### Inherited from

App.\_name

#### Defined in

packages/core/dist/app.d.ts:30

___

### \_overrides

• `Protected` **\_overrides**: `Overrides`

#### Inherited from

App.\_overrides

#### Defined in

packages/core/dist/app.d.ts:32

___

### \_parent

• `Protected` **\_parent**: `App`

#### Inherited from

App.\_parent

#### Defined in

packages/core/dist/app.d.ts:18

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_postHandler

#### Defined in

packages/core/dist/app.d.ts:25

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_postInit

#### Defined in

packages/core/dist/app.d.ts:22

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_postRun

#### Defined in

packages/core/dist/app.d.ts:28

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_preHandler

#### Defined in

packages/core/dist/app.d.ts:23

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_preInit

#### Defined in

packages/core/dist/app.d.ts:20

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_preRun

#### Defined in

packages/core/dist/app.d.ts:26

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

App.\_run

#### Defined in

packages/core/dist/app.d.ts:27

___

### \_scope

• `Protected` **\_scope**: `PluginScope`

#### Inherited from

App.\_scope

#### Defined in

packages/core/dist/app.d.ts:31

___

### addContentTypeParser

• **addContentTypeParser**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:81](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L81)

___

### addHook

• **addHook**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:77](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L77)

___

### addSchema

• **addSchema**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:78](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L78)

___

### all

• **all**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:74](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L74)

___

### decorate

• **decorate**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:83](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L83)

___

### decorateReply

• **decorateReply**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:84](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L84)

___

### decorateRequest

• **decorateRequest**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:85](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L85)

___

### delete

• **delete**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:67](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L67)

___

### get

• **get**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:68](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L68)

___

### head

• **head**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:69](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L69)

___

### options

• **options**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:73](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L73)

___

### opts

• **opts**: `any`

#### Inherited from

App.opts

#### Defined in

packages/core/dist/app.d.ts:33

___

### override

• `Protected` **override**: (`server`: `mixedInstance`<`AppInstance`\>, `fn`: `Plugin`<`any`, `AppInstance`\>, `options`: `any`) => `mixedInstance`<`AppInstance`\>

#### Type declaration

▸ (`server`, `fn`, `options`): `mixedInstance`<`AppInstance`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `server` | `mixedInstance`<`AppInstance`\> |
| `fn` | `Plugin`<`any`, `AppInstance`\> |
| `options` | `any` |

##### Returns

`mixedInstance`<`AppInstance`\>

#### Inherited from

App.override

#### Defined in

packages/core/dist/app.d.ts:63

___

### patch

• **patch**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:70](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L70)

___

### post

• **post**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:71](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L71)

___

### put

• **put**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:72](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L72)

___

### register

• **register**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:88](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L88)

___

### route

• **route**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:75](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L75)

___

### setErrorHandler

• **setErrorHandler**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:91](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L91)

___

### setNotFoundHandler

• **setNotFoundHandler**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:90](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L90)

___

### setSerializerCompiler

• **setSerializerCompiler**: (...`opts`: `any`[]) => `void`

#### Type declaration

▸ (...`opts`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | `any`[] |

##### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:80](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L80)

## Accessors

### apps

• `get` **apps**(): `Map`<`string`, `App`\>

#### Returns

`Map`<`string`, `App`\>

#### Defined in

packages/core/dist/app.d.ts:35

___

### functions

• `get` **functions**(): `Function`[]

#### Returns

`Function`[]

#### Defined in

[packages/common/src/ezapp.ts:51](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L51)

___

### handler

• `get` **handler**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

packages/core/dist/app.d.ts:37

___

### init

• `get` **init**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

packages/core/dist/app.d.ts:36

___

### instance

• `get` **instance**(): `Avvio`<`AppInstance`\>

#### Returns

`Avvio`<`AppInstance`\>

#### Defined in

packages/core/dist/app.d.ts:39

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

packages/core/dist/app.d.ts:40

• `set` **name**(`newName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newName` | `string` |

#### Returns

`void`

#### Defined in

packages/core/dist/app.d.ts:44

___

### overrides

• `get` **overrides**(): `Overrides`

#### Returns

`Overrides`

#### Defined in

packages/core/dist/app.d.ts:43

___

### parent

• `get` **parent**(): `App`

#### Returns

`App`

#### Defined in

packages/core/dist/app.d.ts:42

___

### run

• `get` **run**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

packages/core/dist/app.d.ts:38

___

### scope

• `get` **scope**(): `PluginScope`

#### Returns

`PluginScope`

#### Defined in

packages/core/dist/app.d.ts:41

• `set` **scope**(`newScope`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newScope` | `PluginScope` |

#### Returns

`void`

#### Defined in

packages/core/dist/app.d.ts:45

## Methods

### \_setParent

▸ **_setParent**(`app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `App` |

#### Returns

`void`

#### Inherited from

App.\_setParent

#### Defined in

packages/core/dist/app.d.ts:57

___

### addApp

▸ **addApp**(`name`, `newApp`, `opts?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `newApp` | `App` |
| `opts?` | `any` |

#### Returns

`void`

#### Inherited from

App.addApp

#### Defined in

packages/core/dist/app.d.ts:58

___

### getApp

▸ **getApp**(`name`): `App`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |

#### Returns

`App`

#### Inherited from

App.getApp

#### Defined in

packages/core/dist/app.d.ts:59

___

### getHookPlugin

▸ **getHookPlugin**(`lifecycle`): `PluginType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | `Lifecycle` |

#### Returns

`PluginType`

#### Inherited from

App.getHookPlugin

#### Defined in

packages/core/dist/app.d.ts:60

___

### registerFastifyPlugins

▸ **registerFastifyPlugins**(`server`, `parent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `server` | `any` |
| `parent` | `any` |

#### Returns

`void`

#### Defined in

[packages/common/src/ezapp.ts:93](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L93)

___

### removeHook

▸ **removeHook**(`lifecycle`, `funcName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | `Lifecycle` |
| `funcName` | `string` |

#### Returns

`void`

#### Inherited from

App.removeHook

#### Defined in

packages/core/dist/app.d.ts:55

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

#### Inherited from

App.setCustomOverride

#### Defined in

packages/core/dist/app.d.ts:62

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

#### Inherited from

App.setHandler

#### Defined in

packages/core/dist/app.d.ts:50

___

### setHook

▸ **setHook**(`lifecycle`, `funcName`, `plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | `Lifecycle` |
| `funcName` | `string` |
| `plugin` | `Plugin`<`any`, `any`\> |

#### Returns

`void`

#### Inherited from

App.setHook

#### Defined in

packages/core/dist/app.d.ts:56

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

#### Inherited from

App.setInit

#### Defined in

packages/core/dist/app.d.ts:47

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

#### Inherited from

App.setPostHandler

#### Defined in

packages/core/dist/app.d.ts:51

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

#### Inherited from

App.setPostInit

#### Defined in

packages/core/dist/app.d.ts:48

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

#### Inherited from

App.setPostRun

#### Defined in

packages/core/dist/app.d.ts:54

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

#### Inherited from

App.setPreHandler

#### Defined in

packages/core/dist/app.d.ts:49

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

#### Inherited from

App.setPreInit

#### Defined in

packages/core/dist/app.d.ts:46

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

#### Inherited from

App.setPreRun

#### Defined in

packages/core/dist/app.d.ts:52

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

#### Inherited from

App.setRun

#### Defined in

packages/core/dist/app.d.ts:53

___

### start

▸ **start**(`opts?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `any` |

#### Returns

`Promise`<`void`\>

#### Inherited from

App.start

#### Defined in

packages/core/dist/app.d.ts:61
