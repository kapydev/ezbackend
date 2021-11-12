import fastifySocketIO from 'fastify-socket.io'
import { EzBackendInstance } from '..'

export const socketIOPlugin = async (instance: EzBackendInstance, opts: any) => {
    instance.server.register(fastifySocketIO)
}