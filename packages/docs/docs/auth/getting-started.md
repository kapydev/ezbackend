---
sidebar_position: 1
---

# Getting Started

## Installation

To utilise auth in your app, you need to install `@ezbackend/auth`

```
npm install @ezbackend/auth
```

Once installed, you can add the plugin to your app with

```ts
import { EzAuth } from '@ezbackend/auth';

const app = new EzBackend();

app.addApp('ez-auth', new EzAuth());

app.start();
```
