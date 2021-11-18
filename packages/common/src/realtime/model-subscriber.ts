import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from "typeorm"
import { DecorateClass } from "..";
import { EzBackendInstance } from "..";

export function createModelSubscriber(instance: EzBackendInstance) {

    //URGENT TODO: Figure out if it is possible to have row level security for ALL socket.io emissions instead of checking manually for each one
    return DecorateClass(
        EventSubscriber(),
        class ModelSubscriber implements EntitySubscriberInterface {
            afterInsert(event: InsertEvent<any>) {
                instance.socketIO?.emit("entity_created",event.metadata.name, event.entity);
            }
            afterUpdate(event: UpdateEvent<any>) {
                instance.socketIO?.emit("entity_updated",event.metadata.name, event.entity);
            }
            afterRemove(event: RemoveEvent<any>) {
                instance.socketIO?.emit("entity_deleted",event.metadata.name, event.entity);
            }

        })
}

