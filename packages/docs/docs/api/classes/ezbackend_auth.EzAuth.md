---
id: "_ezbackend_auth.EzAuth"
title: "Class: EzAuth"
sidebar_label: "EzAuth"
custom_edit_url: null
---

[@ezbackend/auth](../modules/_ezbackend_auth).EzAuth

## Hierarchy

- `EzApp`

  ↳ **`EzAuth`**

## Constructors

### constructor

• **new EzAuth**()

#### Overrides

EzApp.constructor

#### Defined in

[packages/auth/src/auth.ts:9](https://github.com/kapydev/ezbackend/blob/15c3f57/packages/auth/src/auth.ts#L9)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, `App`\>

#### Inherited from

EzApp.\_apps

#### Defined in

packages/core/dist/app.d.ts:31

___

### \_functions

• `Protected` **\_functions**: `Function`[]

#### Inherited from

EzApp.\_functions

#### Defined in

packages/common/dist/ezapp.d.ts:7

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_handler

#### Defined in

packages/core/dist/app.d.ts:36

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_init

#### Defined in

packages/core/dist/app.d.ts:33

___

### \_instance

• `Protected` **\_instance**: `Avvio`<`AppInstance`\>

#### Inherited from

EzApp.\_instance

#### Defined in

packages/core/dist/app.d.ts:41

___

### \_name

• `Protected` **\_name**: `string`

#### Inherited from

EzApp.\_name

#### Defined in

packages/core/dist/app.d.ts:42

___

### \_overrides

• `Protected` **\_overrides**: `Overrides`

#### Inherited from

EzApp.\_overrides

#### Defined in

packages/core/dist/app.d.ts:44

___

### \_parent

• `Protected` **\_parent**: `App`

#### Inherited from

EzApp.\_parent

#### Defined in

packages/core/dist/app.d.ts:30

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_postHandler

#### Defined in

packages/core/dist/app.d.ts:37

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_postInit

#### Defined in

packages/core/dist/app.d.ts:34

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_postRun

#### Defined in

packages/core/dist/app.d.ts:40

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_preHandler

#### Defined in

packages/core/dist/app.d.ts:35

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_preInit

#### Defined in

packages/core/dist/app.d.ts:32

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_preRun

#### Defined in

packages/core/dist/app.d.ts:38

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzApp.\_run

#### Defined in

packages/core/dist/app.d.ts:39

___

### \_scope

• `Protected` **\_scope**: `PluginScope`

#### Inherited from

EzApp.\_scope

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

EzApp.addContentTypeParser

#### Defined in

packages/common/dist/ezapp.d.ts:25

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

EzApp.addHook

#### Defined in

packages/common/dist/ezapp.d.ts:22

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

EzApp.addSchema

#### Defined in

packages/common/dist/ezapp.d.ts:23

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

EzApp.all

#### Defined in

packages/common/dist/ezapp.d.ts:20

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

EzApp.decorate

#### Defined in

packages/common/dist/ezapp.d.ts:26

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

EzApp.decorateReply

#### Defined in

packages/common/dist/ezapp.d.ts:27

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

EzApp.decorateRequest

#### Defined in

packages/common/dist/ezapp.d.ts:28

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

EzApp.delete

#### Defined in

packages/common/dist/ezapp.d.ts:13

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

EzApp.get

#### Defined in

packages/common/dist/ezapp.d.ts:14

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

EzApp.head

#### Defined in

packages/common/dist/ezapp.d.ts:15

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

EzApp.options

#### Defined in

packages/common/dist/ezapp.d.ts:19

___

### opts

• **opts**: `any`

#### Inherited from

EzApp.opts

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

EzApp.override

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

EzApp.patch

#### Defined in

packages/common/dist/ezapp.d.ts:16

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

EzApp.post

#### Defined in

packages/common/dist/ezapp.d.ts:17

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

EzApp.put

#### Defined in

packages/common/dist/ezapp.d.ts:18

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

EzApp.register

#### Defined in

packages/common/dist/ezapp.d.ts:29

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

EzApp.route

#### Defined in

packages/common/dist/ezapp.d.ts:21

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

EzApp.setErrorHandler

#### Defined in

packages/common/dist/ezapp.d.ts:31

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

EzApp.setNotFoundHandler

#### Defined in

packages/common/dist/ezapp.d.ts:30

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

EzApp.setSerializerCompiler

#### Defined in

packages/common/dist/ezapp.d.ts:24

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

packages/common/dist/ezapp.d.ts:8

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

EzApp.\_setParent

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

EzApp.addApp

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

EzApp.getApp

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

EzApp.getHookPlugin

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

EzApp.registerFastifyPlugins

#### Defined in

packages/common/dist/ezapp.d.ts:37

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

EzApp.removeHook

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

EzApp.setCustomOverride

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

EzApp.setHandler

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

EzApp.setHook

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

EzApp.setInit

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

EzApp.setPostHandler

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

EzApp.setPostInit

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

EzApp.setPostRun

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

EzApp.setPreHandler

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

EzApp.setPreInit

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

EzApp.setPreRun

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

EzApp.setRun

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

EzApp.start

#### Defined in

packages/core/dist/app.d.ts:151
