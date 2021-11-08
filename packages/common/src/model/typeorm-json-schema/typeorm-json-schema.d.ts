import { EntityMetadata } from 'typeorm';
/**
 * Retrieves the schema name for given metadata, type, and prefix
 * @param meta
 * @param type
 * @param prefix
 * @returns
 */
export declare function getSchemaName(meta: EntityMetadata, type: 'createSchema' | 'updateSchema' | 'fullSchema', prefix?: string): string;
/**
 * Retrives JSON Schema for PATCH requests for given metadata and prefix
 * @param meta
 * @param prefix
 * @returns
 */
export declare function getUpdateSchema(meta: EntityMetadata, prefix?: string): {
    $id: string;
    type: string;
    properties: {};
};
/**
 *  Retrives JSON Schema for POST requests for given metadata and prefix
 * @param meta
 * @param prefix
 * @returns
 */
export declare function getCreateSchema(meta: EntityMetadata, prefix?: string): {
    $id: string;
    type: string;
    properties: {};
    required: string[];
};
/**
 * Retrives full JSON Schema for PATCH requests for given metadata and prefix.
 * Note: This also the schema used for the database ui.
 * @param meta
 * @param prefix
 * @returns
 */
export declare function getFullSchema(meta: EntityMetadata, prefix?: string): {
    $id: string;
    type: string;
    properties: {};
};
/**
 * Top-level function to convert {@link EntityMetaData} from typeOrm to {@link jsonSchema} format to return the {@link createSchema}, {@link createSchema}, and {@link fullSchema}
 * @param meta
 * @param prefix
 * @returns
 */
export declare function convert(meta: EntityMetadata, prefix?: string): {
    createSchema: {
        $id: string;
        type: string;
        properties: {};
        required: string[];
    };
    updateSchema: {
        $id: string;
        type: string;
        properties: {};
    };
    fullSchema: {
        $id: string;
        type: string;
        properties: {};
    };
};
