/*global io*/
/*global ace*/
/*global UI*/
/*global Sidebar*/

const socket = io.connect('https://gg-ggnore.c9users.io')
	
const ScriptSidebar = function ( editor ) {
	const COMPONENTS = 'components'
	const SYSTEMS = 'systems'
	const INIT_SYSTEMS = 'init'
	const LOGIC_SYSTEMS = 'logic'
	const RENDER_SYSTEMS = 'render'
	
	let codeEditor
	
	let container = new UI.Panel()
	container.setId('script-sidebar')

	const onClick = (event) => {
		select(event.target.textContent)
	}
	
	let componentsTab = new UI.Text(COMPONENTS).setTextTransform('uppercase').onClick(onClick)
	let initSystemsTab = new UI.Text(INIT_SYSTEMS).setTextTransform('uppercase').onClick(onClick)
	let logicSystemsTab = new UI.Text(LOGIC_SYSTEMS).setTextTransform('uppercase').onClick(onClick)
	let renderSystemsTab = new UI.Text(RENDER_SYSTEMS).setTextTransform('uppercase').onClick(onClick)

	let tabs = new UI.Div()
	tabs.setId('tabs')
	tabs.add(componentsTab, initSystemsTab, logicSystemsTab, renderSystemsTab)
	container.add(tabs)

	let components = new UI.Span()
	
	container.add(components)
	
	let initSystems = new UI.Span()
	
	container.add(initSystems)

	let logicSystems = new UI.Span()
	
	container.add(logicSystems)

	let renderSystems = new UI.Span()
	
	container.add(renderSystems)

	const select = (section) => {
		componentsTab.setClass('')
		initSystemsTab.setClass('')
		logicSystemsTab.setClass('')
		renderSystemsTab.setClass('')

		components.setDisplay('none')
		initSystems.setDisplay('none')
		logicSystems.setDisplay('none')
		renderSystems.setDisplay('none')

		switch (section) {
			case COMPONENTS:
				componentsTab.setClass('selected')
				components.setDisplay('')
				break
			case INIT_SYSTEMS:
				initSystemsTab.setClass('selected')
				initSystems.setDisplay('')
				break
			case LOGIC_SYSTEMS:
				logicSystemsTab.setClass('selected')
				logicSystems.setDisplay('')
				break
			case RENDER_SYSTEMS:
				renderSystemsTab.setClass('selected')
				renderSystems.setDisplay('')
				break
		}
	}

	select(INIT_SYSTEMS) //todo: set from local storage ? Can you do this with UI lib?

    let activeSection
    let activeFile
    
    socket.on('files fetched', (section, files) => {
        let ul = document.createElement('ul')
        ul.className = 'file-list'
        
        let scriptsContainer = new UI.Row()
        
        for (let file of files) {
        	let scriptRow = new UI.Row()
        	
        	scriptRow.add(new UI.Input(file).setMarginLeft('4px').setMarginBottom('4px').setWidth('130px').setFontSize('12px').onKeyDown(e => {
        		e.stopPropagation()
        		
        		if (e.ctrlKey && e.keyCode === 83) { // ctrl+s
        			e.preventDefault()
        			
					if (file !== e.target.value) {
			            socket.emit('change filename', section, file, e.target.value)
			        }
        		}
			}))
			
			scriptRow.add(new UI.Button('Edit').setMarginLeft('4px').setMarginBottom('4px').onClick(() => {
                socket.emit('fetch file', section, file)
                activeSection = section
                activeFile = file
			}))

			scriptRow.add(new UI.Button('Remove').setMarginLeft('4px').setMarginBottom('4px').onClick(function() {
				if (confirm(`Delete ${file}?`)) {
					socket.emit('delete file', section, file)
					this.dom.parentNode.remove()
				}
			}))
			
			scriptRow.add(new UI.Break())
			
			scriptsContainer.add(scriptRow)
        }
        
        let newScriptButton = new UI.Button('New').setMarginLeft('4px').onClick(e => {
			e.stopPropagation()
			e.preventDefault()
			
			activeSection = section
			activeFile = null
			
			if (codeEditor != null) {
				//todo: set template value
				codeEditor.setValue('', 1)
				codeEditor.focus()
				
				scriptContainer.setDisplay('')
			}
		})
			
        switch (section) {
        	case COMPONENTS:
        		components.clear()
        		components.add(new UI.Break(), new UI.Break(), newScriptButton, new UI.Break(), new UI.Break(), scriptsContainer)
        		break;
			case `${SYSTEMS}/${INIT_SYSTEMS}`:
				initSystems.clear()
				initSystems.add(new UI.Break(), new UI.Break(), newScriptButton, new UI.Break(), new UI.Break(), scriptsContainer)
				break
			case `${SYSTEMS}/${LOGIC_SYSTEMS}`:
				logicSystems.clear()
				logicSystems.add(new UI.Break(), new UI.Break(), newScriptButton, new UI.Break(), new UI.Break(), scriptsContainer)
				break
			case `${SYSTEMS}/${RENDER_SYSTEMS}`:
				renderSystems.clear()
				renderSystems.add(new UI.Break(), new UI.Break(), newScriptButton, new UI.Break(), new UI.Break(), scriptsContainer)
				break
		}
    })

	socket.emit('fetch files', `${COMPONENTS}`)
	socket.emit('fetch files', `${SYSTEMS}/${INIT_SYSTEMS}`)
	socket.emit('fetch files', `${SYSTEMS}/${LOGIC_SYSTEMS}`)
	socket.emit('fetch files', `${SYSTEMS}/${RENDER_SYSTEMS}`)
	
	socket.on('filename changed', (section, newFile) => {
		socket.emit('fetch files', section)	
	})
	
	socket.on('file saved', (section, file, isNew) => {
		if (isNew) {
			socket.emit('fetch files', section)
		}
	})
	
	const scriptContainer = new UI.Panel()
	scriptContainer.setId('script-editor')
	scriptContainer.setPosition('absolute')
	scriptContainer.setBackgroundColor('#272822')
	scriptContainer.setDisplay('none')
	
	document.body.appendChild( scriptContainer.dom )
	
	codeEditor = ace.edit('script-editor')
    codeEditor.setTheme('ace/theme/monokai')
    codeEditor.getSession().setMode('ace/mode/javascript')
	
	socket.on('file fetched', file => {
		codeEditor.setValue(file, 1)
		codeEditor.focus()
		
		scriptContainer.setDisplay('')
	})

	socket.on('file deleted', (section, script) => {
		if (script !== activeFile) {
			return
		}
		
		codeEditor.setValue('', 1)
		scriptContainer.setDisplay('none')
	})
	
	scriptContainer.onKeyDown((e) => {
		if (e.keyCode === 27) { // esc
			e.preventDefault()
			e.stopPropagation()
			
			scriptContainer.setDisplay('none')
		}
		
		if (e.ctrlKey && e.keyCode === 83) { // ctrl+s
			e.preventDefault()
			e.stopPropagation()
			
			let annotations = codeEditor.getSession().getAnnotations().filter(a => a.type === 'error')
                
            if (annotations.length) {
                return alert(annotations.map(({row, column, text}) => `error [row ${row}, column ${column}]: ${text}\n\n`))
            }
            
            if (activeFile == null) {
            	const filename = prompt('Filename:')

				if (filename == null) {
				    return
				}
				
				activeFile = filename
            }
            
			socket.emit('save file', activeSection, activeFile, codeEditor.getValue())
			
			setTimeout(() => {
				scriptContainer.setDisplay('none')
			}, 1000)
		}
	})
	
	return container
}

// Make three editor sidebar not crash
Sidebar.Script = function (editor) {
	let container = new UI.CollapsiblePanel()
	
	container.setDisplay('none')

	return container
}