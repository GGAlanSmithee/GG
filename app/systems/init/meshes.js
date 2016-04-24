export const Components = [ 'appearance' ];

export default (entities, { rendererManager }) => {
    rendererManager.addMesh('cylinder', 'phong');
};