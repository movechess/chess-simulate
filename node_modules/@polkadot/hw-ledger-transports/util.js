export function createDefs(...items) {
    return items.map(([type, Clazz]) => ({
        create: () => Clazz.create(),
        type
    }));
}
