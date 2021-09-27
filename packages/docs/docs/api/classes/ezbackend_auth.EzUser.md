---
id: "_ezbackend_auth.EzUser"
title: "Class: EzUser"
sidebar_label: "EzUser"
custom_edit_url: null
---

[@ezbackend/auth](../modules/_ezbackend_auth).EzUser

## Hierarchy

- `EzModel`

  ↳ **`EzUser`**

## Constructors

### constructor

• **new EzUser**(`modelName`, `providerNames`, `modelSchema?`, `modelOptions?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `providerNames` | [`Providers`](../modules/_ezbackend_auth#providers) |
| `modelSchema` | `ModelSchema` |
| `modelOptions` | `ModelOptions` |

#### Overrides

EzModel.constructor

#### Defined in

[packages/auth/src/ez-user.ts:22](https://github.com/kapydev/ezbackend/blob/0b3a1d7/packages/auth/src/ez-user.ts#L22)

## Properties

### \_apps

• `Protected` **\_apps**: `Map`<`string`, `App`\>

#### Inherited from

EzModel.\_apps

#### Defined in

packages/core/dist/app.d.ts:19

___

### \_functions

• `Protected` **\_functions**: `Function`[]

#### Inherited from

EzModel.\_functions

#### Defined in

packages/common/dist/ezapp.d.ts:3

___

### \_handler

• `Protected` **\_handler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_handler

#### Defined in

packages/core/dist/app.d.ts:24

___

### \_init

• `Protected` **\_init**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_init

#### Defined in

packages/core/dist/app.d.ts:21

___

### \_instance

• `Protected` **\_instance**: `Avvio`<`AppInstance`\>

#### Inherited from

EzModel.\_instance

#### Defined in

packages/core/dist/app.d.ts:29

___

### \_name

• `Protected` **\_name**: `string`

#### Inherited from

EzModel.\_name

#### Defined in

packages/core/dist/app.d.ts:30

___

### \_overrides

• `Protected` **\_overrides**: `Overrides`

#### Inherited from

EzModel.\_overrides

#### Defined in

packages/core/dist/app.d.ts:32

___

### \_parent

• `Protected` **\_parent**: `App`

#### Inherited from

EzModel.\_parent

#### Defined in

packages/core/dist/app.d.ts:18

___

### \_postHandler

• `Protected` **\_postHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_postHandler

#### Defined in

packages/core/dist/app.d.ts:25

___

### \_postInit

• `Protected` **\_postInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_postInit

#### Defined in

packages/core/dist/app.d.ts:22

___

### \_postRun

• `Protected` **\_postRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_postRun

#### Defined in

packages/core/dist/app.d.ts:28

___

### \_preHandler

• `Protected` **\_preHandler**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_preHandler

#### Defined in

packages/core/dist/app.d.ts:23

___

### \_preInit

• `Protected` **\_preInit**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_preInit

#### Defined in

packages/core/dist/app.d.ts:20

___

### \_preRun

• `Protected` **\_preRun**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_preRun

#### Defined in

packages/core/dist/app.d.ts:26

___

### \_run

• `Protected` **\_run**: `Map`<`string`, `Plugin`<`any`, `any`\>\>

#### Inherited from

EzModel.\_run

#### Defined in

packages/core/dist/app.d.ts:27

___

### \_scope

• `Protected` **\_scope**: `PluginScope`

#### Inherited from

EzModel.\_scope

#### Defined in

packages/core/dist/app.d.ts:31

___

### opts

• **opts**: `any`

#### Inherited from

EzModel.opts

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

EzModel.override

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

packages/common/dist/ezapp.d.ts:4

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

EzModel.\_setParent

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

EzModel.addApp

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

EzModel.getHookPlugin

#### Defined in

packages/core/dist/app.d.ts:59

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

EzModel.registerFastifyPlugins

#### Defined in

packages/common/dist/ezapp.d.ts:6

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

EzModel.removeHook

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

EzModel.setCustomOverride

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

EzModel.setHandler

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

EzModel.setHook

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

EzModel.setInit

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

EzModel.setPostHandler

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

EzModel.setPostInit

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

EzModel.setPostRun

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

EzModel.setPreHandler

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

EzModel.setPreInit

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

EzModel.setPreRun

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

EzModel.setRun

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

EzModel.start

#### Defined in

packages/core/dist/app.d.ts:60
