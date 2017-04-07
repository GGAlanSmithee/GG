export const Components = [ "name" ]

export default (entities) => {
    for (const {entity} of entities) {
        const {name} = entity
        
        console.log(name)
    }
}