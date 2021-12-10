import { socketContext } from "socket-io-event-context"
import type { LoadEvent } from "typeorm"
import { EzBackend, EzBackendInstance } from '..'
import { getContext, REALTIME } from '../rules/context'
import {Server} from "socket.io"
import "../declarations/socket-io-declarations"

const checkReadRules = (instance: EzBackendInstance) => {
    const event = getContext(REALTIME.RULE_CONTEXT)
    if (event) {
        instance.orm.subscribers.forEach(subscriber => {
            //URGENT TODO: Handle multiple contexts
            //URGENT URGENT TODO: Make sure we don't run nonsubscriber for subscribers that are not rules
            subscriber.afterLoad?.(event.entity, event as LoadEvent<any>)
        })
    }
}

export const outgoingPacketMiddleware: Parameters<EzBackend["setPostHandler"]>[1] = async (instance, opts) => {
    instance._server.addHook("onReady", async () => {
        //TODO: Figure out why this needs the `as Server` type
        (instance._server.io as Server).use((socket, next) => {

            //This is a monkey patch in order to ensure outgoing packets are secure u
            //@ts-ignore
            const oldWriteToEngine = socket.client.writeToEngine.bind(socket.client)

            //@ts-ignore
            socket.client.writeToEngine = function (...args) {
                try {
                    socketContext.set(REALTIME.SOCKET_CONTEXT, socket.request)
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