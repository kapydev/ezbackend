---
id: "_ezbackend_common.EzModel"
title: "Class: EzModel"
sidebar_label: "EzModel"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).EzModel

Child of EzApp. This is your data model.

## Hierarchy

- [`EzModelRepo`](_ezbackend_common.EzModelRepo)

  ↳ **`EzModel`**

## Constructors

### constructor

• **new EzModel**(`modelName`, `modelSchema`, `opts?`)

Creates a fastify instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `modelSchema` | [`ModelSchema`](../modules/_ezbackend_common#modelschema) |
| `opts` | [`ModelOpts`](../modules/_ezbackend_common#modelopts) |

#### Overrides

[EzModelRepo](_ezbackend_common.EzModelRepo).[constructor](_ezbackend_common.EzModelRepo#constructor)

#### Defined in

[packages/common/src/model/model.ts:192](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/model/model.ts#L192)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, `App`\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_apps](_ezbackend_common.EzModelRepo#_apps)

#### Defined in

packages/core/dist/app.d.ts:31

___

### \_functions

• `Protected` **\_functions**: `Function`[] = `[]`

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_functions](_ezbackend_common.EzModelRepo#_functions)

#### Defined in

[packages/common/src/ezapp.ts:53](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L53)

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_handler](_ezbackend_common.EzModelRepo#_handler)

#### Defined in

packages/core/dist/app.d.ts:36

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_init](_ezbackend_common.EzModelRepo#_init)

#### Defined in

packages/core/dist/app.d.ts:33

___

### \_instance

• `Protected` **\_instance**: `Avvio`<`AppInstance`\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_instance](_ezbackend_common.EzModelRepo#_instance)

#### Defined in

packages/core/dist/app.d.ts:41

___

### \_name

• `Protected` **\_name**: `string`

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_name](_ezbackend_common.EzModelRepo#_name)

#### Defined in

packages/core/dist/app.d.ts:42

___

### \_overrides

• `Protected` **\_overrides**: `Overrides`

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_overrides](_ezbackend_common.EzModelRepo#_overrides)

#### Defined in

packages/core/dist/app.d.ts:44

___

### \_parent

• `Protected` **\_parent**: `App`

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_parent](_ezbackend_common.EzModelRepo#_parent)

#### Defined in

packages/core/dist/app.d.ts:30

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_postHandler](_ezbackend_common.EzModelRepo#_posthandler)

#### Defined in

packages/core/dist/app.d.ts:37

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_postInit](_ezbackend_common.EzModelRepo#_postinit)

#### Defined in

packages/core/dist/app.d.ts:34

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_postRun](_ezbackend_common.EzModelRepo#_postrun)

#### Defined in

packages/core/dist/app.d.ts:40

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_preHandler](_ezbackend_common.EzModelRepo#_prehandler)

#### Defined in

packages/core/dist/app.d.ts:35

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_preInit](_ezbackend_common.EzModelRepo#_preinit)

#### Defined in

packages/core/dist/app.d.ts:32

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_preRun](_ezbackend_common.EzModelRepo#_prerun)

#### Defined in

packages/core/dist/app.d.ts:38

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_run](_ezbackend_common.EzModelRepo#_run)

#### Defined in

packages/core/dist/app.d.ts:39

___

### \_scope

• `Protected` **\_scope**: `PluginScope`

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[_scope](_ezbackend_common.EzModelRepo#_scope)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[addContentTypeParser](_ezbackend_common.EzModelRepo#addcontenttypeparser)

#### Defined in

[packages/common/src/ezapp.ts:87](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L87)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[addHook](_ezbackend_common.EzModelRepo#addhook)

#### Defined in

[packages/common/src/ezapp.ts:83](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L83)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[addSchema](_ezbackend_common.EzModelRepo#addschema)

#### Defined in

[packages/common/src/ezapp.ts:84](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L84)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[all](_ezbackend_common.EzModelRepo#all)

#### Defined in

[packages/common/src/ezapp.ts:80](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L80)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[decorate](_ezbackend_common.EzModelRepo#decorate)

#### Defined in

[packages/common/src/ezapp.ts:89](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L89)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[decorateReply](_ezbackend_common.EzModelRepo#decoratereply)

#### Defined in

[packages/common/src/ezapp.ts:90](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L90)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[decorateRequest](_ezbackend_common.EzModelRepo#decoraterequest)

#### Defined in

[packages/common/src/ezapp.ts:91](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L91)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[delete](_ezbackend_common.EzModelRepo#delete)

#### Defined in

[packages/common/src/ezapp.ts:73](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L73)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[get](_ezbackend_common.EzModelRepo#get)

#### Defined in

[packages/common/src/ezapp.ts:74](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L74)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[head](_ezbackend_common.EzModelRepo#head)

#### Defined in

[packages/common/src/ezapp.ts:75](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L75)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[options](_ezbackend_common.EzModelRepo#options)

#### Defined in

[packages/common/src/ezapp.ts:79](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L79)

___

### opts

• **opts**: `any`

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[opts](_ezbackend_common.EzModelRepo#opts)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[override](_ezbackend_common.EzModelRepo#override)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[patch](_ezbackend_common.EzModelRepo#patch)

#### Defined in

[packages/common/src/ezapp.ts:76](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L76)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[post](_ezbackend_common.EzModelRepo#post)

#### Defined in

[packages/common/src/ezapp.ts:77](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L77)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[put](_ezbackend_common.EzModelRepo#put)

#### Defined in

[packages/common/src/ezapp.ts:78](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L78)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[register](_ezbackend_common.EzModelRepo#register)

#### Defined in

[packages/common/src/ezapp.ts:94](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L94)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[route](_ezbackend_common.EzModelRepo#route)

#### Defined in

[packages/common/src/ezapp.ts:81](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L81)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setErrorHandler](_ezbackend_common.EzModelRepo#seterrorhandler)

#### Defined in

[packages/common/src/ezapp.ts:97](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L97)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setNotFoundHandler](_ezbackend_common.EzModelRepo#setnotfoundhandler)

#### Defined in

[packages/common/src/ezapp.ts:96](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L96)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setSerializerCompiler](_ezbackend_common.EzModelRepo#setserializercompiler)

#### Defined in

[packages/common/src/ezapp.ts:86](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L86)

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

[packages/common/src/ezapp.ts:55](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L55)

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

### router

• `get` **router**(): [`EzRouter`](_ezbackend_common.EzRouter)

#### Returns

[`EzRouter`](_ezbackend_common.EzRouter)

#### Defined in

[packages/common/src/model/model.ts:188](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/model/model.ts#L188)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[_setParent](_ezbackend_common.EzModelRepo#_setparent)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[addApp](_ezbackend_common.EzModelRepo#addapp)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[getApp](_ezbackend_common.EzModelRepo#getapp)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[getHookPlugin](_ezbackend_common.EzModelRepo#gethookplugin)

#### Defined in

packages/core/dist/app.d.ts:146

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[registerFastifyPlugins](_ezbackend_common.EzModelRepo#registerfastifyplugins)

#### Defined in

[packages/common/src/ezapp.ts:104](https://github.com/kapydev/ezbackend/blob/345dd45/packages/common/src/ezapp.ts#L104)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[removeHook](_ezbackend_common.EzModelRepo#removehook)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setCustomOverride](_ezbackend_common.EzModelRepo#setcustomoverride)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setHandler](_ezbackend_common.EzModelRepo#sethandler)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setHook](_ezbackend_common.EzModelRepo#sethook)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setInit](_ezbackend_common.EzModelRepo#setinit)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setPostHandler](_ezbackend_common.EzModelRepo#setposthandler)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setPostInit](_ezbackend_common.EzModelRepo#setpostinit)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setPostRun](_ezbackend_common.EzModelRepo#setpostrun)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setPreHandler](_ezbackend_common.EzModelRepo#setprehandler)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setPreInit](_ezbackend_common.EzModelRepo#setpreinit)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setPreRun](_ezbackend_common.EzModelRepo#setprerun)

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

[EzModelRepo](_ezbackend_common.EzModelRepo).[setRun](_ezbackend_common.EzModelRepo#setrun)

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

#### Inherited from

[EzModelRepo](_ezbackend_common.EzModelRepo).[start](_ezbackend_common.EzModelRepo#start)

#### Defined in

packages/core/dist/app.d.ts:151
