import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from "typeorm"
import { DecorateClass } from "..";
import { EzBackendInstance } from "..";

export function createModelSubscriber(instance: EzBackendInstance) {

    //URGENT URGENT TODO: Expose IO Commands
    function getIO() {
        return instance._server.io as (typeof instance._server.io | undefined)
    }


    //URGENT TODO: Figure out if it is possible to have row level security for ALL socket.io emissions instead of checking manually for each one
    return DecorateClass(
        EventSubscriber(),
        class ModelSubscriber implements EntitySubscriberInterface {
            afterInsert(event: InsertEvent<any>) {
                getIO()?.emit("entity_created",event.metadata.name, event.entity);
            }
            afterUpdate(event: UpdateEvent<any>) {
                getIO()?.emit("entity_updated",event.metadata.name, event.entity);
            }
            afterRemove(event: RemoveEvent<any>) {
                getIO()?.emit("entity_deleted",event.metadata.name, event.entity);
            }

        })
}

