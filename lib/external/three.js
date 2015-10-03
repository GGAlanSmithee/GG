declare module three {
    declare class Euler {
        x : number;
        y : number;
        z : number;
    }
    
    declare class Vector3 {
        x : number;
        y : number;
        z : number;
        
        set(x : number, y : number, z : number) : void;
    }
    
    declare class Object3D {
        position : Vector3;
        rotation : Euler;
        
        add(object : Object3D) : Object3D;
        
        updateMatrixWorld(force : ?bool) : void;
    }
    
    declare class WebGLRenderTarget {
        width   : number;
        height  : number;
        options : Object;
        
        constructor(width : number, height : number, options : Object) : WebGLRenderTarget;
    }
    
    declare class WebGLRenderTargetCube extends WebGLRenderTarget {
        
    }
    
    declare class Scene extends Object3D {
    }
    
    declare class Camera extends Object3D {
        lookAt(vector : Vector3) : void;
    }
    
    declare class PerspectiveCamera extends Camera {

    }
    
    declare class WebGLRenderer {
        domElement : HTMLCanvasElement;
        
        setSize(width : number, height : number, updateStyle? : bool) : void;
        render(scene : Scene, camera : Camera, renderTarget : ?WebGLRenderTargetCube, forceClear : ?bool) : void;
    }
    
    declare class Geometry {
        
    }
    
    declare class BoxGeometry extends Geometry {
        
    }
    
    declare class Mesh extends Object3D {
        
    }
    
    declare class MeshBasicMaterial {
        
    }
    
    declare class JSONLoader {
        load(path : string, callback : (geometry : Geometry, materials : Array<string>) => void) : void;
    }
    
    declare class AmbientLight extends Object3D {

    }
    
    declare class DirectionalLight extends Object3D {
        position : Vector3;
    }
}