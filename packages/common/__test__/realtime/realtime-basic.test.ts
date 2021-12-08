import { EzBackend, EzModel, Type, RuleType } from "../../src"
import clientIO, { Socket as ClientSocket } from "socket.io-client"

function connectAsync(socket: ClientSocket) {
    return new Promise((resolve, reject) => {
        socket.connect()
        socket.once("connect", () => {
            resolve(socket)
        })
        socket.once('connect_error', function () {
            reject(new Error('connect_error'));
        });
        socket.once('connect_timeout', function () {
            reject(new Error('connect_timeout'));
        });

    })
}


describe("All realtime listeners should run as expected", () => {

    let app: EzBackend
    let fakeUser: EzModel
    let clientSocket: ClientSocket

    const PORT = 8001

    beforeEach(async () => {
        app = new EzBackend()
        fakeUser = new EzModel("FakeUser", {
            name: Type.VARCHAR,
            age: Type.INT
        })

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

        clientSocket = clientIO(`http://localhost:${PORT}`, {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
        })
        await connectAsync(clientSocket)
    })

    afterEach(async () => {
        clientSocket.close()
        const instance = app.getInternalInstance()
        await instance.orm.close();
        await instance._server.close();
    });

    test("Should be able to receive create events", (done) => {

        const userPayload = {
            name: "Thomas",
            age: 23
        }

        clientSocket.on("entity_created", (modelName: string, entity: any) => {
            expect(modelName).toBe("FakeUser")
            expect(entity).toMatchObject(userPayload)
            done()
        })

        app.inject({
            method: 'POST',
            url: '/user',
            payload: userPayload
        })

    })

    test("Should be able to receive update events", (done) => {

        const userPayload = {
            name: "Thomas",
            age: 23
        }

        clientSocket.on("entity_updated", (modelName: string, entity: any) => {
            expect(modelName).toBe("FakeUser")
            expect(entity).toMatchObject({
                age: 92
            })
            done()
        })

        app.inject({
            method: 'POST',
            url: '/user',
            payload: userPayload
        }).then(() => {
            app.inject({
                method: "PATCH",
                url: '/user/1',
                payload: { age: 92 }
            })
        })

    })

    test("Should be able to receive delete events", (done) => {

        const userPayload = {
            name: "Thomas",
            age: 23
        }

        clientSocket.on("entity_deleted", (modelName: string, entity: any) => {
            expect(modelName).toBe("FakeUser")
            expect(entity).toMatchObject({
                age: 23,
                id: 1,
                name: "Thomas"
            })
            done()
        })

        app.inject({
            method: 'POST',
            url: '/user',
            payload: userPayload
        }).then(() => {
            app.inject({
                method: "DELETE",
                url: '/user/1',
            })
        })

    })

    test.todo("Running Database Reads before database start should not result in hook errors")

    test.todo("Having multiple read/write contexts in a single request should not result in the first hooks being overwritten")

    test.todo("Socket IO should be namespaced")

    test.todo("Rule Override Should work")


})

