---
sidebar_position: 1
---

# Additional Routing Methods

There are two main methods of creating routes (And a third method advanced method discussed [here](using-fastify#from-registered-plugin-with-instance-and-fastify-instance))

```ts
const app = new EzBackend();
const base = new EzApp();

//METHOD 1
base.get('/method1', async (req, res) => {
  return { hello: 'world' };
});

//METHOD 2
base.setHandler('Method 2', async (instance, opts) => {
  instance.server.get('/method2', async (req, res) => {
    return { hello: 'world' };
  });
});

app.addApp('base', base);

app.start();
```

Both methods are the same, however each method has their pros and cons

| Method | Pros            | Cons               |
| ------ | --------------- | ------------------ |
| 1      | Shorter Syntax  | No instance access |
| 2      | Instance access | Longer Syntax      |

There are several other methods for creating routes as well, for exampl
