import { EzBackend, EzModel, Type } from "@ezbackend/common"
import { EzOpenAPI } from "../../openapi/src"
import { EzDbUI } from '../src'

const app = new EzBackend()

//---Plugins---
app.addApp(new EzOpenAPI())
app.addApp(new EzDbUI())
//---Plugins---

const userDetails = new EzModel('UserDetails', {
    company: Type.VARCHAR,
    age: Type.INT,
    score: Type.FLOAT
})

const session = new EzModel('Session', {
    name: Type.VARCHAR,
    users: {
        type: Type.ONE_TO_MANY,
        target: 'User',
        inverseSide: 'session',
        eager: true
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

app.addApp('User', user, { prefix: 'n-user' })
app.addApp('Session', session, { prefix: 'session' })
app.addApp('UserDetails', userDetails, { prefix: 'user-details' })

// app.removeHook('_run', "Run Fastify Server")


const run = async () => {

    await app.start({
        server: {
            // logger: false
        }
    })
    //run the internal fastify boot sequence
    // await app.inject({
    //     method: "GET",
    //     url: "/"
    
    // })
}

run()