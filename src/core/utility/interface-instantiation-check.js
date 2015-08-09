export default function(base, self, derrivedClasses) {
    let isDerrived = false;
    
    for (let derrivedClass of derrivedClasses) {
        if (self instanceof derrivedClass) {
            isDerrived = true;
            
            break;
        }
    }
    
    if (!isDerrived) {
        let derrivedClassesNames = [];
        
        for (let derrivedClass of derrivedClasses) {
            derrivedClassesNames.push(derrivedClass.name);
        }
        
        derrivedClassesNames = derrivedClassesNames.join(' or ');
        
        throw TypeError(['Cannot instantiate interface', base.name, 'use', derrivedClassesNames, 'instead'].join(' '));
    }
}