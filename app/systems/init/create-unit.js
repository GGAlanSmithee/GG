export const Components = []

export default function createUnit(entities, { rendererManager }) {
    let { entity } = this.create(1, 'unit')
    
    entity.appearance.id = rendererManager.addMesh('cylinder', 'phong')
    
    console.log(entity)
}