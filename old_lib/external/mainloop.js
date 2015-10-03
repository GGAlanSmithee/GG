declare class MainLoop {
    setDraw(drawFunction: function): MainLoop;
    setUpdate(updateFunction: function): MainLoop;
    start(): void;
}

declare module 'mainloop.js' {
    declare var exports: MainLoop;
}