---
id: "_ezbackend_common.EzBackend"
title: "Class: EzBackend"
sidebar_label: "EzBackend"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).EzBackend

Child of EzApp. This is where you set up your backend setup tasks.

## Hierarchy

- [`EzApp`](_ezbackend_common.EzApp)

  ↳ **`EzBackend`**

## Constructors

### constructor

• **new EzBackend**()

Creates a fastify instance

#### Overrides

[EzApp](_ezbackend_common.EzApp).[constructor](_ezbackend_common.EzApp#constructor)

#### Defined in

[packages/common/src/ezbackend.ts:61](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L61)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, `App`\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_apps](_ezbackend_common.EzApp#_apps)

#### Defined in

packages/core/dist/app.d.ts:31

___

### \_functions

• `Protected` **\_functions**: `Function`[] = `[]`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_functions](_ezbackend_common.EzApp#_functions)

#### Defined in

[packages/common/src/ezapp.ts:53](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L53)

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_handler](_ezbackend_common.EzApp#_handler)

#### Defined in

packages/core/dist/app.d.ts:36

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_init](_ezbackend_common.EzApp#_init)

#### Defined in

packages/core/dist/app.d.ts:33

___

### \_instance

• `Protected` **\_instance**: `Avvio`<`AppInstance`\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_instance](_ezbackend_common.EzApp#_instance)

#### Defined in

packages/core/dist/app.d.ts:41

___

### \_name

• `Protected` **\_name**: `string`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_name](_ezbackend_common.EzApp#_name)

#### Defined in

packages/core/dist/app.d.ts:42

___

### \_overrides

• `Protected` **\_overrides**: `Overrides`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_overrides](_ezbackend_common.EzApp#_overrides)

#### Defined in

packages/core/dist/app.d.ts:44

___

### \_parent

• `Protected` **\_parent**: `App`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_parent](_ezbackend_common.EzApp#_parent)

#### Defined in

packages/core/dist/app.d.ts:30

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_postHandler](_ezbackend_common.EzApp#_posthandler)

#### Defined in

packages/core/dist/app.d.ts:37

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_postInit](_ezbackend_common.EzApp#_postinit)

#### Defined in

packages/core/dist/app.d.ts:34

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_postRun](_ezbackend_common.EzApp#_postrun)

#### Defined in

packages/core/dist/app.d.ts:40

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_preHandler](_ezbackend_common.EzApp#_prehandler)

#### Defined in

packages/core/dist/app.d.ts:35

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_preInit](_ezbackend_common.EzApp#_preinit)

#### Defined in

packages/core/dist/app.d.ts:32

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_preRun](_ezbackend_common.EzApp#_prerun)

#### Defined in

packages/core/dist/app.d.ts:38

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_run](_ezbackend_common.EzApp#_run)

#### Defined in

packages/core/dist/app.d.ts:39

___

### \_scope

• `Protected` **\_scope**: `PluginScope`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_scope](_ezbackend_common.EzApp#_scope)

#### Defined in

packages/core/dist/app.d.ts:43

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

[packages/common/src/ezapp.ts:87](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L87)

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

[packages/common/src/ezapp.ts:83](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L83)

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

[packages/common/src/ezapp.ts:84](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L84)

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

[packages/common/src/ezapp.ts:80](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L80)

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

[packages/common/src/ezapp.ts:89](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L89)

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

[packages/common/src/ezapp.ts:90](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L90)

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

[packages/common/src/ezapp.ts:91](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L91)

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

[packages/common/src/ezapp.ts:73](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L73)

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

[packages/common/src/ezapp.ts:74](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L74)

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

[packages/common/src/ezapp.ts:75](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L75)

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

[packages/common/src/ezapp.ts:79](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L79)

___

### opts

• **opts**: `any`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[opts](_ezbackend_common.EzApp#opts)

#### Defined in

packages/core/dist/app.d.ts:45

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

packages/core/dist/app.d.ts:165

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

[packages/common/src/ezapp.ts:76](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L76)

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

[packages/common/src/ezapp.ts:77](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L77)

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

[packages/common/src/ezapp.ts:78](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L78)

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

[packages/common/src/ezapp.ts:94](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L94)

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

[packages/common/src/ezapp.ts:81](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L81)

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

[packages/common/src/ezapp.ts:97](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L97)

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

[packages/common/src/ezapp.ts:96](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L96)

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

[packages/common/src/ezapp.ts:86](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L86)

## Accessors

### apps

• `get` **apps**(): `Map`<`string`, `App`\>

#### Returns

`Map`<`string`, `App`\>

#### Defined in

packages/core/dist/app.d.ts:47

___

### functions

• `get` **functions**(): `Function`[]

#### Returns

`Function`[]

#### Defined in

[packages/common/src/ezapp.ts:55](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L55)

___

### handler

• `get` **handler**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

packages/core/dist/app.d.ts:49

___

### init

• `get` **init**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

packages/core/dist/app.d.ts:48

___

### instance

• `get` **instance**(): `Avvio`<`AppInstance`\>

#### Returns

`Avvio`<`AppInstance`\>

#### Defined in

packages/core/dist/app.d.ts:51

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

packages/core/dist/app.d.ts:52

• `set` **name**(`newName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newName` | `string` |

#### Returns

`void`

#### Defined in

packages/core/dist/app.d.ts:56

___

### overrides

• `get` **overrides**(): `Overrides`

#### Returns

`Overrides`

#### Defined in

packages/core/dist/app.d.ts:55

___

### parent

• `get` **parent**(): `App`

#### Returns

`App`

#### Defined in

packages/core/dist/app.d.ts:54

___

### run

• `get` **run**(): `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Returns

`Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Defined in

packages/core/dist/app.d.ts:50

___

### scope

• `get` **scope**(): `PluginScope`

#### Returns

`PluginScope`

#### Defined in

packages/core/dist/app.d.ts:53

• `set` **scope**(`newScope`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newScope` | `PluginScope` |

#### Returns

`void`

#### Defined in

packages/core/dist/app.d.ts:57

## Methods

### \_setParent

▸ **_setParent**(`app`): `void`

Assigns current app to a parent app.
Note! You can only have a maximum of 1 parent.
EzBackend follows Fastify's encapsulation system. Click [here](https://www.fastify.io/docs/latest/Encapsulation/) for more information on Fastify's encapsulation

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `App` |

#### Returns

`void`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[_setParent](_ezbackend_common.EzApp#_setparent)

#### Defined in

packages/core/dist/app.d.ts:131

___

### addApp

▸ **addApp**(`name`, `newApp`, `opts?`): `void`

Creates a new app
Note! You cannot have an app with the same name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `newApp` | `App` |  |
| `opts?` | `any` | options |

#### Returns

`void`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[addApp](_ezbackend_common.EzApp#addapp)

#### Defined in

packages/core/dist/app.d.ts:139

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

packages/core/dist/app.d.ts:140

___

### getHookPlugin

▸ **getHookPlugin**(`lifecycle`): `PluginType`

Retrieves the function assigned to the lifecycle method for the current app

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycle` | `Lifecycle` |

#### Returns

`PluginType`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[getHookPlugin](_ezbackend_common.EzApp#gethookplugin)

#### Defined in

packages/core/dist/app.d.ts:146

___

### getInternalInstance

▸ **getInternalInstance**(): `any`

#### Returns

`any`

#### Defined in

[packages/common/src/ezbackend.ts:97](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L97)

___

### getInternalServer

▸ **getInternalServer**(): `any`

#### Returns

`any`

#### Defined in

[packages/common/src/ezbackend.ts:107](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L107)

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

[packages/common/src/ezbackend.ts:111](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L111)

___

### printPlugins

▸ **printPlugins**(): `any`

#### Returns

`any`

#### Defined in

[packages/common/src/ezbackend.ts:120](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L120)

___

### printRoutes

▸ **printRoutes**(): `any`

#### Returns

`any`

#### Defined in

[packages/common/src/ezbackend.ts:116](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L116)

___

### registerFastifyPlugins

▸ **registerFastifyPlugins**(`server`, `parent`): `void`

Registers all fastify plugins to server instance of ezbackend application

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `server` | `any` | Server instance |
| `parent` | `any` | EzBackend Object |

#### Returns

`void`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[registerFastifyPlugins](_ezbackend_common.EzApp#registerfastifyplugins)

#### Defined in

[packages/common/src/ezapp.ts:104](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezapp.ts#L104)

___

### removeHook

▸ **removeHook**(`lifecycle`, `funcName`): `void`

Removes a previously added function from a lifecycle method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lifecycle` | `Lifecycle` | Lifecycle where function was added |
| `funcName` | `string` | Name of function that was added |

#### Returns

`void`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[removeHook](_ezbackend_common.EzApp#removehook)

#### Defined in

packages/core/dist/app.d.ts:117

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

packages/core/dist/app.d.ts:157

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setHandler](_ezbackend_common.EzApp#sethandler)

#### Defined in

packages/core/dist/app.d.ts:87

___

### setHook

▸ **setHook**(`lifecycle`, `funcName`, `plugin`): `void`

Helper function for each lifecycle method to set it's argument functions as hooks in the lifecycle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lifecycle` | `Lifecycle` | Point in the lifecycle to place the function |
| `funcName` | `string` | Name of function to be placed |
| `plugin` | `Plugin`<`any`, `any`\> | Plugin where function is located in |

#### Returns

`void`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setHook](_ezbackend_common.EzApp#sethook)

#### Defined in

packages/core/dist/app.d.ts:124

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setInit](_ezbackend_common.EzApp#setinit)

#### Defined in

packages/core/dist/app.d.ts:69

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setPostHandler](_ezbackend_common.EzApp#setposthandler)

#### Defined in

packages/core/dist/app.d.ts:93

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setPostInit](_ezbackend_common.EzApp#setpostinit)

#### Defined in

packages/core/dist/app.d.ts:75

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setPostRun](_ezbackend_common.EzApp#setpostrun)

#### Defined in

packages/core/dist/app.d.ts:111

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setPreHandler](_ezbackend_common.EzApp#setprehandler)

#### Defined in

packages/core/dist/app.d.ts:81

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setPreInit](_ezbackend_common.EzApp#setpreinit)

#### Defined in

packages/core/dist/app.d.ts:63

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setPreRun](_ezbackend_common.EzApp#setprerun)

#### Defined in

packages/core/dist/app.d.ts:99

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[setRun](_ezbackend_common.EzApp#setrun)

#### Defined in

packages/core/dist/app.d.ts:105

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

#### Overrides

[EzApp](_ezbackend_common.EzApp).[start](_ezbackend_common.EzApp#start)

#### Defined in

[packages/common/src/ezbackend.ts:125](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/common/src/ezbackend.ts#L125)
