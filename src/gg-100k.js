import Game     from './core/game';
import MainLoop from 'mainloop.js';

class App {
    constructor() {
        this.game = new Game();
    }
    
    update(delta) {
        console.log('...updating');
        
        this.game.update(delta);
    }
    
    draw(interpolationPercentage) {
        console.log('...drawing');
        
        this.game.draw(interpolationPercentage);
    }
    
    run() {
        MainLoop.setUpdate(delta => { this.update(delta); })
                .setDraw(interpolationPercentage => { this.draw(interpolationPercentage); })
                .start();
    }
}

export { App };