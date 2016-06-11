/*global THREE*/
/*global UI*/
/*global GG*/

const Player = function(editor) {
	const signals = editor.signals

	const container = new UI.Panel()
	container.setId('player')
	container.setPosition('absolute')
	container.setDisplay('none')

	const player = new GG()

	window.addEventListener('resize', () => {
		player.setSize(container.dom.clientWidth, container.dom.clientHeight)
	})

	signals.startPlayer.add(() => {
		container.setDisplay('')

		player.load(editor.toJSON())
		player.setSize(container.dom.clientWidth, container.dom.clientHeight)
		player.play()

		container.dom.appendChild(player.getDom())
	})

	signals.stopPlayer.add(() => {
		container.setDisplay('none')

		player.stop()

		container.dom.removeChild(player.getDom())
	})

	return container
}