---
id: "_ezbackend_core"
title: "Module: @ezbackend/core"
sidebar_label: "@ezbackend/core"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [EzBackend](../classes/_ezbackend_core.EzBackend)
- [EzPlugin](../classes/_ezbackend_core.EzPlugin)

## Interfaces

- [IEzbConfig](../interfaces/_ezbackend_core.IEzbConfig)

## Type aliases

### IEzbPlugin

Ƭ **IEzbPlugin**: `avvio.Plugin`<`unknown`, [`EzBackend`](../classes/_ezbackend_core.EzBackend)\>

#### Defined in

[core/src/ezbackend.ts:6](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L6)

___

### IEzbPlugins

Ƭ **IEzbPlugins**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `handler` | [`IEzbPlugin`](_ezbackend_core#iezbplugin) \| ``null`` |
| `init` | [`IEzbPlugin`](_ezbackend_core#iezbplugin) \| ``null`` |
| `postHandler` | [`IEzbPlugin`](_ezbackend_core#iezbplugin)[] |
| `postInit` | [`IEzbPlugin`](_ezbackend_core#iezbplugin)[] |
| `postRun` | [`IEzbPlugin`](_ezbackend_core#iezbplugin)[] |
| `preHandler` | [`IEzbPlugin`](_ezbackend_core#iezbplugin)[] |
| `preInit` | [`IEzbPlugin`](_ezbackend_core#iezbplugin)[] |
| `preRun` | [`IEzbPlugin`](_ezbackend_core#iezbplugin)[] |
| `run` | [`IEzbPlugin`](_ezbackend_core#iezbplugin) \| ``null`` |

#### Defined in

[core/src/ezbackend.ts:16](https://github.com/kapydev/ezbackend/blob/d8ca14a/packages/core/src/ezbackend.ts#L16)
