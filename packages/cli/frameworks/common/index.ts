import {EzBackend, EzModel, Type} from '@ezbackend/common'
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";

const app = new EzBackend()

//---Plugins---
app.addApp('openapi', new EzOpenAPI())
app.addApp('db-ui', new EzDbUI())
app.addApp('cors', new EzCors())
//---Plugins---

const userDetails = new EzModel('UserDetails', {
  company:Type.VARCHAR,
  age: Type.INT,
  score: Type.FLOAT
})

const session = new EzModel('Session', {
  name: Type.VARCHAR,
  users: {
    type: Type.ONE_TO_MANY,
    target: 'User',
    inverseSide: 'session',
    eager:true
  }
})

const user = new EzModel('User', {
  name: Type.VARCHAR,
  age: Type.INT,
  userDetails: {
    type: Type.ONE_TO_ONE,
    joinColumn: true,
    cascade: true,
    eager: true,
    target: 'UserDetails'
  },
  session: {
    type: Type.MANY_TO_ONE,
    target: 'Session',
    inverseSide: 'users'
  }
})

app.addApp('User', user, { prefix: 'user' })
app.addApp('Session', session, { prefix: 'session' })
app.addApp('UserDetails', userDetails, { prefix: 'user-details' })
app.start()