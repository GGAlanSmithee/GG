import Create from './src'

let startPlayer = null
let stopPlayer = null

const Player = function( editor ) {
	const signals = editor.signals

	const container = new UI.Panel()
	container.setId('player')
	container.setPosition('absolute')
	container.setDisplay('none')

	const player = Create()

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

var player = new Player( window.editor );
document.body.appendChild( player.dom );
			
if (module.hot) {
    module.hot.accept()
    
    module.hot.dispose(() => {
    	window.editor.signals.startPlayer.remove(startPlayer)
    	window.editor.signals.stopPlayer.remove(stopPlayer)
    })
}