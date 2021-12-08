import type { LoadEvent } from "typeorm"
import { EzBackend, EzBackendInstance } from '..'
import { getContext, REALTIME } from '../rules/context'

const checkReadRules = (instance: EzBackendInstance) => {
    const event = getContext(REALTIME.RULE_CONTEXT)
    if (event) {
        instance.orm.subscribers.forEach(subscriber => {
            //URGENT TODO: Handle multiple contexts
            subscriber.afterLoad?.(event.entity, event as LoadEvent<any>)
        })
    }
}

export const outgoingPacketMiddleware: Parameters<EzBackend["setPostHandler"]>[1] = async (instance, opts) => {
    instance._server.addHook("onReady", async () => {
        instance._server.io.use((socket, next) => {

            //This is a monkey patch in order to ensure outgoing packets are secure u
            //@ts-ignore
            const oldWriteToEngine = socket.client.writeToEngine.bind(socket.client)

            //@ts-ignore
            socket.client.writeToEngine = function (...args) {

                try {
                    if (getContext(REALTIME.IGNORE_RULES) !== true) {
                        checkReadRules(instance)
                    }

                    oldWriteToEngine(...args)
                } catch {

                }
            }

            next()
        })
    })
}