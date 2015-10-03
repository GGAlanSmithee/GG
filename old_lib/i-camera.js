declare type ICamera = {
    setPosition(x : number, y : number, z : number) : void;
    
    getPosition() : IVector3;
    
    lookAt(vector : IVector3) : void;
    
    updateWorldMatrix(force : ?bool) : void;
}