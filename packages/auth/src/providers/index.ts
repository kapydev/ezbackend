import { GoogleProvider } from './google'
import { Web3Provider } from './web3'

//URGENT TODO: Remove dependency on name here being the same as name in SUPER call
export default {
    google: GoogleProvider,
    web3: Web3Provider
}

export * from './base'
export * from './google'
export * from './web3'