import dotenv from 'dotenv'
import { useEffect } from 'react'
import {io} from "socket.io-client"
import { getBaseURL } from '../Helpers'

dotenv.config()

const URL = getBaseURL()




function SocketIODocs() {

    useEffect(()=>{
        console.log("CONNECTING SOCKET IO")
        const socket = io(URL!,{
            withCredentials: true,
            transports: ["websocket"]
        })
        
        socket.on("connect", () => {
            console.log("Socket IO Connected!")
        })
    },[])

    return (
        <div>Development in Progress</div>
    )
}

export default SocketIODocs