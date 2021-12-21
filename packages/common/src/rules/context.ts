import { als } from 'asynchronous-local-storage';
import { InsertEvent, LoadEvent, RemoveEvent, UpdateEvent } from 'typeorm';

export enum REALTIME {
    RULE_CONTEXT = "RULE_CONTEXT",
    REQ_CONTEXT = "REQ_CONTEXT",
    SOCKET_CONTEXT = "SOCKET_CONTEXT",
    IGNORE_RULES = "IGNORE_RULES",
    USED_BY_EZB = "USED_BY_EZB"
}

export interface AllowedValues {
    [REALTIME.RULE_CONTEXT]: LoadEvent<any> | UpdateEvent<any> | InsertEvent<any> | RemoveEvent<any>
    [REALTIME.IGNORE_RULES]: boolean
    //TODO: Set Request context and socket context types
    [REALTIME.REQ_CONTEXT]: any
    [REALTIME.SOCKET_CONTEXT]: any
    [REALTIME.USED_BY_EZB]: boolean
}

export function setUsedByEzb() {
    setContext(REALTIME.USED_BY_EZB, true)
}

export function ignoreRules() {
  setContext(REALTIME.IGNORE_RULES, true);
}

export function setContext<T extends REALTIME>(
  key: T,
  value: AllowedValues[T],
) {
  als.set(key, value);
}

export function getContext<T extends REALTIME>(
  key: T,
): AllowedValues[T] | undefined {
  return als.get(key);
}
