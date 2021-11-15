export const DecorateClass = (decorators: any, target: Function) => {
    decorators = Array.isArray(decorators) ? decorators : [decorators];
    (decorators as any[]).forEach(decorator => decorator(target))
    return target
}