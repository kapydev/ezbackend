import dotenv from 'dotenv'
import {io} from "socket.io-client"
import { getBaseURL } from '../Helpers'

dotenv.config()

const URL = getBaseURL()

const socket = io(URL!,{
    withCredentials: true,
    transports: ["websocket"]
})

socket.on("connect", () => {
    console.log("Socket IO Connected!")
})

function SocketIODocs() {
    return (
        <div>Hello</div>
    )
}

export default SocketIODocs