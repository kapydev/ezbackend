import { EzBackend, EzModel, Type, RuleType } from "@ezbackend/common"
import { EzAuth, EzUser } from "../src"
import clientIO, { Socket as ClientSocket } from "socket.io-client"

describe("Realtime Auth", () => {

  const PORT = 8002
  let app: EzBackend

  beforeEach(async () => {
    app = new EzBackend()
    const fakeUser = new EzUser("User", ["google"])
    app.addApp(fakeUser, { prefix: "user" })

    await app.start({
      backend: {
        fastify: {
          logger: false
        },
        typeorm: {
          database: ':memory:'
        },
        listen: {
          port: PORT
        }
      }
    })
  })

  afterEach(async () => {
    await app.close()
  })
  
  // URGENT TODO
  test("Realtime Auth should work even when no user is provided",async() => {
    // const clientSocket = clientIO(`http://localhost:${PORT}`, {
    //   reconnectionDelay: 0,
    //   forceNew: true,
    //   transports: ['websocket']
    // })

    
    expect(1).toBe(1)
  })

  // URGENT TODO
  test.todo("Realtime Auth user deserialization should work")
})

export { }