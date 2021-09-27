---
id: "_ezbackend_common.EzBackend"
title: "Class: EzBackend"
sidebar_label: "EzBackend"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).EzBackend

## Hierarchy

- [`EzApp`](_ezbackend_common.EzApp)

  ↳ **`EzBackend`**

## Constructors

### constructor

• **new EzBackend**()

#### Overrides

[EzApp](_ezbackend_common.EzApp).[constructor](_ezbackend_common.EzApp#constructor)

#### Defined in

[packages/common/src/ezbackend.ts:54](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezbackend.ts#L54)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, `App`\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_apps](_ezbackend_common.EzApp#_apps)

#### Defined in

packages/core/dist/app.d.ts:19

___

### \_functions

• `Protected` **\_functions**: `Function`[] = `[]`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_functions](_ezbackend_common.EzApp#_functions)

#### Defined in

[packages/common/src/ezapp.ts:49](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L49)

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_handler](_ezbackend_common.EzApp#_handler)

#### Defined in

packages/core/dist/app.d.ts:24

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_init](_ezbackend_common.EzApp#_init)

#### Defined in

packages/core/dist/app.d.ts:21

___

### \_instance

• `Protected` **\_instance**: `Avvio`<`AppInstance`\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_instance](_ezbackend_common.EzApp#_instance)

#### Defined in

packages/core/dist/app.d.ts:29

___

### \_name

• `Protected` **\_name**: `string`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_name](_ezbackend_common.EzApp#_name)

#### Defined in

packages/core/dist/app.d.ts:30

___

### \_overrides

• `Protected` **\_overrides**: `Overrides`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_overrides](_ezbackend_common.EzApp#_overrides)

#### Defined in

packages/core/dist/app.d.ts:32

___

### \_parent

• `Protected` **\_parent**: `App`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_parent](_ezbackend_common.EzApp#_parent)

#### Defined in

packages/core/dist/app.d.ts:18

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_postHandler](_ezbackend_common.EzApp#_posthandler)

#### Defined in

packages/core/dist/app.d.ts:25

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_postInit](_ezbackend_common.EzApp#_postinit)

#### Defined in

packages/core/dist/app.d.ts:22

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_postRun](_ezbackend_common.EzApp#_postrun)

#### Defined in

packages/core/dist/app.d.ts:28

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_preHandler](_ezbackend_common.EzApp#_prehandler)

#### Defined in

packages/core/dist/app.d.ts:23

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_preInit](_ezbackend_common.EzApp#_preinit)

#### Defined in

packages/core/dist/app.d.ts:20

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_preRun](_ezbackend_common.EzApp#_prerun)

#### Defined in

packages/core/dist/app.d.ts:26

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_run](_ezbackend_common.EzApp#_run)

#### Defined in

packages/core/dist/app.d.ts:27

___

### \_scope

• `Protected` **\_scope**: `PluginScope`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_scope](_ezbackend_common.EzApp#_scope)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[addContentTypeParser](_ezbackend_common.EzApp#addcontenttypeparser)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[addHook](_ezbackend_common.EzApp#addhook)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[addSchema](_ezbackend_common.EzApp#addschema)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[all](_ezbackend_common.EzApp#all)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[decorate](_ezbackend_common.EzApp#decorate)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[decorateReply](_ezbackend_common.EzApp#decoratereply)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[decorateRequest](_ezbackend_common.EzApp#decoraterequest)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[delete](_ezbackend_common.EzApp#delete)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[get](_ezbackend_common.EzApp#get)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[head](_ezbackend_common.EzApp#head)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[options](_ezbackend_common.EzApp#options)

#### Defined in

[packages/common/src/ezapp.ts:73](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezapp.ts#L73)

___

### opts

• **opts**: `any`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[opts](_ezbackend_common.EzApp#opts)

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

[EzApp](_ezbackend_common.EzApp).[override](_ezbackend_common.EzApp#override)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[patch](_ezbackend_common.EzApp#patch)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[post](_ezbackend_common.EzApp#post)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[put](_ezbackend_common.EzApp#put)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[register](_ezbackend_common.EzApp#register)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[route](_ezbackend_common.EzApp#route)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setErrorHandler](_ezbackend_common.EzApp#seterrorhandler)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setNotFoundHandler](_ezbackend_common.EzApp#setnotfoundhandler)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setSerializerCompiler](_ezbackend_common.EzApp#setserializercompiler)

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

[EzApp](_ezbackend_common.EzApp).[_setParent](_ezbackend_common.EzApp#_setparent)

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

[EzApp](_ezbackend_common.EzApp).[addApp](_ezbackend_common.EzApp#addapp)

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

[EzApp](_ezbackend_common.EzApp).[getApp](_ezbackend_common.EzApp#getapp)

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

[EzApp](_ezbackend_common.EzApp).[getHookPlugin](_ezbackend_common.EzApp#gethookplugin)

#### Defined in

packages/core/dist/app.d.ts:60

___

### inject

▸ **inject**(`injectOpts`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `injectOpts` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/common/src/ezbackend.ts:91](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezbackend.ts#L91)

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[registerFastifyPlugins](_ezbackend_common.EzApp#registerfastifyplugins)

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

[EzApp](_ezbackend_common.EzApp).[removeHook](_ezbackend_common.EzApp#removehook)

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

[EzApp](_ezbackend_common.EzApp).[setCustomOverride](_ezbackend_common.EzApp#setcustomoverride)

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

[EzApp](_ezbackend_common.EzApp).[setHandler](_ezbackend_common.EzApp#sethandler)

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

[EzApp](_ezbackend_common.EzApp).[setHook](_ezbackend_common.EzApp#sethook)

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

[EzApp](_ezbackend_common.EzApp).[setInit](_ezbackend_common.EzApp#setinit)

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

[EzApp](_ezbackend_common.EzApp).[setPostHandler](_ezbackend_common.EzApp#setposthandler)

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

[EzApp](_ezbackend_common.EzApp).[setPostInit](_ezbackend_common.EzApp#setpostinit)

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

[EzApp](_ezbackend_common.EzApp).[setPostRun](_ezbackend_common.EzApp#setpostrun)

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

[EzApp](_ezbackend_common.EzApp).[setPreHandler](_ezbackend_common.EzApp#setprehandler)

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

[EzApp](_ezbackend_common.EzApp).[setPreInit](_ezbackend_common.EzApp#setpreinit)

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

[EzApp](_ezbackend_common.EzApp).[setPreRun](_ezbackend_common.EzApp#setprerun)

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

[EzApp](_ezbackend_common.EzApp).[setRun](_ezbackend_common.EzApp#setrun)

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

#### Overrides

[EzApp](_ezbackend_common.EzApp).[start](_ezbackend_common.EzApp#start)

#### Defined in

[packages/common/src/ezbackend.ts:106](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/common/src/ezbackend.ts#L106)
