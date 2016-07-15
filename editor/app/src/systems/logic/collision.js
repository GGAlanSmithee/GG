export const Components = [ 'transform', 'velocity' ];

export default (entities) => {
    for (var { entity } of entities) {
        console.log('colliding', entity)
    }
}