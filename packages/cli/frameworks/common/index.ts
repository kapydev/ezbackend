import {EzBackend, EzModel, Type} from '@ezbackend/common'
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";

const app = new EzBackend()

//---Plugins---
//Everything is an app in EzBackend
app.addApp('openapi', new EzOpenAPI())
app.addApp('db-ui', new EzDbUI())
app.addApp('cors', new EzCors())
//---Plugins---

const model = new EzModel('ModelName', {
  var1: Type.VARCHAR, //string
  var2: Type.INT, //integer
})

app.addApp(model, { prefix: 'model-route-prefix' })
app.start()