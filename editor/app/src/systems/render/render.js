export const Components = [
    'transform',
    'appearance'
]

export default (entities, {renderManager}) => {
    for (const {entity} of entities) {
        const {appearance, transform} = entity
        
        const obj = renderManager.scene.getObjectById(appearance.id)
        
        if (obj === undefined) {
            continue
        }
        
        obj.position.x = transform.x
        obj.position.y = transform.y
        obj.position.z = transform.z
    }
}