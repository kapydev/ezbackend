import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from "typeorm"
import { DecorateClass } from "..";
import { EzBackendInstance } from "..";

export function createModelSubscriber(instance: EzBackendInstance) {

    //URGENT URGENT TODO: Expose IO Commands
    function getIO() {
        return instance._server.io
    }

    return DecorateClass(
        EventSubscriber(),
        class ModelSubscriber implements EntitySubscriberInterface {
            afterInsert(event: InsertEvent<any>) {
                getIO().emit("entity_inserted",event.metadata.name, event.entity);
            }
            afterUpdate(event: UpdateEvent<any>) {
                getIO().emit("entity_updated",event.metadata.name, event.entity);
            }
            afterRemove(event: RemoveEvent<any>) {
                getIO().emit("entity_deleted",event.metadata.name, event.entity);
            }

        })
}

