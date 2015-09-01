export default function(base, self, derrivedClass) {
    if (!(self instanceof derrivedClass)) {
        throw TypeError('Cannot instantiate interface', base.name);
    }
}