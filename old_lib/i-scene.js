declare type IScene = {
    getPosition() : IVector3;
    
    add(object : IObject) : IObject;
}