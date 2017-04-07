/*global UI*/
import {create} from './src'

let startPlayer = null
let stopPlayer = null
const player = create()

const Player = function( editor ) {
	const signals = editor.signals

	const container = new UI.Panel()
	container.setId('player')
	container.setPosition('absolute')
	container.setDisplay('none')

	window.addEventListener('resize', () => {
		player.setSize(container.dom.clientWidth, container.dom.clientHeight)
	})

	startPlayer = function() {
		container.setDisplay('')

		player.load(editor.toJSON())
		player.setSize(container.dom.clientWidth, container.dom.clientHeight)
		player.play()

		container.dom.appendChild(player.getDom())
	}
	
	signals.startPlayer.add(startPlayer)

	stopPlayer = function() {
		container.setDisplay('none')

		player.stop()

		container.dom.removeChild(player.getDom())
	}
	
	signals.stopPlayer.add(stopPlayer)

	return container
}

document.body.appendChild(new Player(window.editor).dom)
			
if (module.hot) {
    module.hot.accept()
    
    module.hot.dispose(() => {
    	const {signals} = window.editor
    	
    	signals.startPlayer.remove(startPlayer)
    	signals.stopPlayer.remove(stopPlayer)
    
        //todo move to new "reset" function of GG engine
        player.entityManager.componentManager.init()
        player.entityManager.systemManager.init()
        player.entityManager.entityFactory.init()
        player.entityManager.eventHandler.init()
        player.entityManager.init(player.entityManager.capacity)
        
        player.entityData = null
    })
}