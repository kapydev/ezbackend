import { als } from 'asynchronous-local-storage'
import { socketContext } from "socket-io-event-context"
import type { LoadEvent } from "typeorm"
import { EzBackend } from '..'

export const outgoingPacketMiddleware: Parameters<EzBackend["setPostHandler"]>[1] = async (instance, opts) => {
    instance._server.addHook("onReady", async () => {
        instance._server.io.use((socket, next) => {

            //This is a monkey patch in order to ensure outgoing packets are secure u
            //@ts-ignore
            const oldWriteToEngine = socket.client.writeToEngine.bind(socket.client)

            //@ts-ignore
            socket.client.writeToEngine = function (...args) {

                try {
                    const event = als.get<LoadEvent<any>>("rule_context")
                    socketContext.set("request", socket.request)
                    if (event) {
                        instance.orm.subscribers.forEach(subscriber => {
                            subscriber.afterLoad?.(event.entity, event)
                        })
                    }
                    oldWriteToEngine(...args)
                } catch {
                }
            }

            next()
        })
    })
}