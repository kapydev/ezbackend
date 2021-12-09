import { FastifyRequest } from "fastify";
import { requestContext } from "fastify-request-context";
import { socketContext } from "socket-io-event-context";
import { Socket } from "socket.io";
import {
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  LoadEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from "typeorm";
import { DecorateClass } from "../model";
import { EzApp } from "../ezapp";
import { getContext, REALTIME, setContext } from "./context";

export enum RuleType {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export type RuleTypes = Array<RuleType>;

export type GetEventContext<Type extends RuleType> =
  Type extends RuleType.CREATE
    ? InsertEvent<any>
    : Type extends RuleType.READ
    ? LoadEvent<any>
    : Type extends RuleType.UPDATE
    ? UpdateEvent<any>
    : Type extends RuleType.DELETE
    ? RemoveEvent<any>
    : never;

export type AllPossibleEventContexts<T extends RuleTypes = RuleTypes> =
  GetEventContext<T[number]>;

export type AllPossibleRequestTypes = FastifyRequest | Socket["request"] | null;

export type RuleFunction<T extends RuleTypes = RuleTypes> = (
  req: AllPossibleRequestTypes,
  event: AllPossibleEventContexts<T>,
) => void;

export type RuleFunctionMeta = {
  types: RuleTypes;
  rule: RuleFunction;
};

export class EzRules<
  CurrentRuleTypes extends RuleTypes = RuleTypes,
> extends EzApp {
  modelName: string;
  context: RuleTypes;
  ruleFunctionMetas: Array<RuleFunctionMeta>;

  constructor(modelName: string) {
    super();
    this.modelName = modelName;
    this.context = [];
    this.ruleFunctionMetas = [];

    this.setInit("Add Rules Subscriber", async (instance) => {
      instance.subscribers.unshift(createRulesSubscriber(this));
    });
  }

  for<T extends RuleTypes>(...rules: T): EzRules<T> {
    this.context = rules;
    return this as unknown as EzRules<T>;
  }

  check(rule: RuleFunction<CurrentRuleTypes>) {
    this.ruleFunctionMetas.push({
      types: this.context,
      rule: rule,
    });
    return this;
  }
}

export function createRulesSubscriber(ezRules: EzRules) {
  function isRelevantRule(
    event: AllPossibleEventContexts,
    ruleMeta: RuleFunctionMeta,
    ruleType: RuleType,
  ) {
    // TODO: Make it work with listenTo() to reduce overhead
    if (event.metadata.name !== ezRules.modelName) {
      return false;
    }

    // TODO: Make RuleSubscriber only subscribe to used events to reduce overhead
    if (!ruleMeta.types.includes(ruleType)) {
      return false;
    }

    return true;
  }

  function getFastifyRequest() {
    return requestContext.get(REALTIME.REQ_CONTEXT) as FastifyRequest;
  }

  function getSocketRequest() {
    return socketContext.get<Socket["request"]>(REALTIME.SOCKET_CONTEXT);
  }

  class RuleSubscriber implements EntitySubscriberInterface {
    afterLoad(entity: any, event: LoadEvent<any>) {
      if (getContext(REALTIME.IGNORE_RULES) === true) return;
      setContext(REALTIME.RULE_CONTEXT, event);
      ezRules.ruleFunctionMetas.forEach((ruleMeta) => {
        if (!isRelevantRule(event, ruleMeta, RuleType.READ)) return;
        const fastifyReq = getFastifyRequest();
        if (fastifyReq) ruleMeta.rule(fastifyReq, event);
        const socketReq = getSocketRequest();
        if (socketReq) ruleMeta.rule(socketReq, event);
      });
    }

    beforeUpdate(event: UpdateEvent<any>) {
      if (getContext(REALTIME.IGNORE_RULES) === true) return;
      setContext(REALTIME.RULE_CONTEXT, event);
      ezRules.ruleFunctionMetas.forEach((ruleMeta) => {
        if (!isRelevantRule(event, ruleMeta, RuleType.UPDATE)) return;
        const fastifyReq = getFastifyRequest();
        if (fastifyReq) ruleMeta.rule(fastifyReq, event);
        const socketReq = getSocketRequest();
        if (socketReq) ruleMeta.rule(socketReq, event);
      });
    }

    beforeInsert(event: InsertEvent<any>) {
      if (getContext(REALTIME.IGNORE_RULES) === true) return;
      setContext(REALTIME.RULE_CONTEXT, event);
      ezRules.ruleFunctionMetas.forEach((ruleMeta) => {
        if (!isRelevantRule(event, ruleMeta, RuleType.CREATE)) return;
        const fastifyReq = getFastifyRequest();
        if (fastifyReq) ruleMeta.rule(fastifyReq, event);
        const socketReq = getSocketRequest();
        if (socketReq) ruleMeta.rule(socketReq, event);
      });
    }

    beforeRemove(event: RemoveEvent<any>) {
      if (getContext(REALTIME.IGNORE_RULES) === true) return;
      setContext(REALTIME.RULE_CONTEXT, event);
      ezRules.ruleFunctionMetas.forEach((ruleMeta) => {
        if (!isRelevantRule(event, ruleMeta, RuleType.DELETE)) return;
        const fastifyReq = getFastifyRequest();
        if (fastifyReq) ruleMeta.rule(fastifyReq, event);
        const socketReq = getSocketRequest();
        if (socketReq) ruleMeta.rule(socketReq, event);
      });
    }
  }

  return DecorateClass(EventSubscriber(), RuleSubscriber);
}
