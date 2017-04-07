export const Components = [ 'transform', 'velocity' ]

export default (entities, delta) => {
    for (const {entity} of entities) {

        const {transform, velocity} = entity
        
        transform.x += velocity.x * delta / 1000
        transform.y += velocity.y * delta / 1000
        transform.z += velocity.z * delta / 1000
    }
}