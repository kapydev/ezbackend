import {EzBackend, EzModel, Type} from '@ezbackend/common'
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";

const app = new EzBackend()

//---Plugins---
//Everything is an ezapp in ezbackend
app.addApp(new EzOpenAPI())
app.addApp(new EzDbUI())
app.addApp(new EzCors())
//---Plugins---

//Models are also ezapps in ezbackend
const model = new EzModel('ModelName', {
  var1: Type.VARCHAR, //string
  var2: Type.INT, //integer
})

app.addApp(model, { prefix: 'model-route-prefix' })

app.start()