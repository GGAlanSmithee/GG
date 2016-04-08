export default (entities, delta, opts) => {
    console.log(opts);
    
    for (var entity of entities) {
        console.log(entity);
    }
};