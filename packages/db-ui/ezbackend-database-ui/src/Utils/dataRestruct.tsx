export default function dataRestruct(ls1: string[], ls2: Object[]) {
    return ls2.map((ls2val, index) => {
        return {
            schemaName: ls1[index],
            //@ts-ignore // TODO
            properties: ls2[index].properties
        }
    })
}