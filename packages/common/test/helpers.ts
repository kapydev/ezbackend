import { EzBackend } from "@ezbackend/common";

//TODO: Figure if there is a better way of getting this data
export function getInternalInstance(ezb: EzBackend) {
    //@ts-ignore
    return ezb.instance._lastUsed.server
}