import ThreeJSONMeshLoader from './three-json-mesh-loader';
import QwestAjaxLoader     from './qwest-ajax-loader';
import PatrolJsNavigation  from './patroljs-navigation';

function CreateMeshLoader() {
    return new ThreeJSONMeshLoader();
}

function CreateAjaxLoader() {
    return new QwestAjaxLoader();
}

function CreateNavigtion() {
    return new PatrolJsNavigation();
}

export { CreateMeshLoader, CreateAjaxLoader, CreateNavigtion };