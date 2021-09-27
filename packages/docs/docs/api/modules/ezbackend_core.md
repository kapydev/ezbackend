---
id: "_ezbackend_core"
title: "Module: @ezbackend/core"
sidebar_label: "@ezbackend/core"
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [PluginScope](../enums/_ezbackend_core.PluginScope)

## Classes

- [App](../classes/_ezbackend_core.App)
- [AppInstance](../classes/_ezbackend_core.AppInstance)

## Type aliases

### Lifecycle

Ƭ **Lifecycle**: ``"_preInit"`` \| ``"_init"`` \| ``"_postInit"`` \| ``"_preHandler"`` \| ``"_handler"`` \| ``"_postHandler"`` \| ``"_preRun"`` \| ``"_run"`` \| ``"_postRun"``

#### Defined in

[packages/core/src/app.ts:9](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L9)

___

### Override

Ƭ **Override**: `Avvio`<[`AppInstance`](../classes/_ezbackend_core.AppInstance)\>[``"override"``]

#### Defined in

[packages/core/src/app.ts:41](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L41)

___

### Overrides

Ƭ **Overrides**: `Object`

#### Index signature

▪ [name: `string`]: `Avvio`<`unknown`\>[``"override"``]

#### Defined in

[packages/core/src/app.ts:43](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L43)

___

### PluginType

Ƭ **PluginType**: `Plugin`<`unknown`, [`AppInstance`](../classes/_ezbackend_core.AppInstance)\>

#### Defined in

[packages/core/src/app.ts:8](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L8)

## Variables

### LIFECYCLE

• **LIFECYCLE**: [`Lifecycle`](_ezbackend_core#lifecycle)[]

#### Defined in

[packages/core/src/app.ts:25](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/app.ts#L25)

___

### kApp

• **kApp**: typeof [`kApp`](_ezbackend_core#kapp)

#### Defined in

[packages/core/src/symbols.ts:1](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/symbols.ts#L1)

___

### kInstance

• **kInstance**: typeof [`kInstance`](_ezbackend_core#kinstance)

#### Defined in

[packages/core/src/symbols.ts:2](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/symbols.ts#L2)

___

### kScope

• **kScope**: typeof [`kScope`](_ezbackend_core#kscope)

#### Defined in

[packages/core/src/symbols.ts:3](https://github.com/kapydev/ezbackend/blob/dbd1712/packages/core/src/symbols.ts#L3)
