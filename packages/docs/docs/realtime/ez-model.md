# EzModel

You can listen to EzModel updates using socket.io

# Full Example

## Basic Listeners

You can listen to create, update and delete events occuring in the database via Socket.io

| Socket.io Namespace | Event Name       | Arg 1       | Arg 2                                | Caveats                                       |
| :-----------------: | ---------------- | ----------- | ------------------------------------ | --------------------------------------------- |
|         `/`         | `entity_created` | Entity Name | Full Entity                          |
|         `/`         | `entity_updated` | Entity Name | Partial Entity (Only Updated Values) |
|         `/`         | `entity_deleted` | Entity Name | Full Entity                          | Only works when using typeorm method `remove` |

## Client Side (JS/TS)

You can connect and listen to the event updates with the following client side code (Assuming typescript)

```ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/'); //Or your backend url

socket.on('entity_created', (entityName, entity) => {
  console.log('Entity Name:', entityName);
  console.log('Entity:', entity);
});

socket.on('entity_updated', (entityName, entity) => {
  console.log('Entity Name:', entityName);
  console.log('Partial Entity:', entity);
});

socket.on('entity_deleted', (entityName, entity) => {
  console.log('Entity Name:', entityName);
  console.log('Entity:', entity);
});
```

## Authentication Client Side (JS/TS)

In order to send the authentication session, you can use the following

```ts
import { io } from 'socket.io-client';

const socket = io(
  'http://localhost:8000/', //Or your backend url
  {
    withCredentials: true,
  },
);
```

On the backend side, this populates `req.user` which allows you to manage authentication of users.
