---
id: "_ezbackend_common.EzRouter"
title: "Class: EzRouter"
sidebar_label: "EzRouter"
custom_edit_url: null
---

[@ezbackend/common](../modules/_ezbackend_common).EzRouter

## Hierarchy

- [`EzApp`](_ezbackend_common.EzApp)

  ↳ **`EzRouter`**

## Constructors

### constructor

• **new EzRouter**(`opts?`, `generators?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `IAPIGeneratorOpts` |
| `generators` | `Object` |
| `generators.createOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `generators.deleteOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `generators.getAll` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `generators.getOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |
| `generators.updateOne` | (`repo`: `Repository`<`unknown`\>, `opts?`: [`GenerateOpts`](../interfaces/_ezbackend_common.GenerateOpts)) => `RouteOptions`<`Server`, `IncomingMessage`, `ServerResponse`, `RouteGenericInterface`, `unknown`, `FastifySchema`\> |

#### Overrides

[EzApp](_ezbackend_common.EzApp).[constructor](_ezbackend_common.EzApp#constructor)

#### Defined in

[packages/common/src/model/generators/api-generator.ts:49](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/model/generators/api-generator.ts#L49)

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

[packages/common/src/ezapp.ts:28](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/ezapp.ts#L28)

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

packages/core/dist/app.d.ts:62

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

[packages/common/src/ezapp.ts:30](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/ezapp.ts#L30)

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

▸ **addApp**(`name`, `newApp`, `opts?`, `scope?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `newApp` | `App` |
| `opts?` | `any` |
| `scope?` | `PluginScope` |

#### Returns

`void`

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[addApp](_ezbackend_common.EzApp#addapp)

#### Defined in

packages/core/dist/app.d.ts:58

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

packages/core/dist/app.d.ts:59

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

[packages/common/src/ezapp.ts:54](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/common/src/ezapp.ts#L54)

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

packages/core/dist/app.d.ts:61

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

#### Inherited from

[EzApp](_ezbackend_common.EzApp).[start](_ezbackend_common.EzApp#start)

#### Defined in

packages/core/dist/app.d.ts:60
