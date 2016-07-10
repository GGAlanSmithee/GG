/*global io*/
/*global ace*/
/*global UI*/
/*global Sidebar*/

const socket = io.connect('https://gg-ggnore.c9users.io')
	
const ScriptSidebar = function ( editor ) {
	const SYSTEMS = 'systems'
	const INIT_SYSTEMS = 'init'
	const LOGIC_SYSTEMS = 'logic'
	const RENDER_SYSTEMS = 'render'
	
	let container = new UI.Panel()
	container.setId('script-sidebar')

	const onClick = (event) => {
		select(event.target.textContent)
	}
	
	let initSystemsTab = new UI.Text(INIT_SYSTEMS).setTextTransform('uppercase').onClick(onClick)
	let logicSystemsTab = new UI.Text(LOGIC_SYSTEMS).setTextTransform('uppercase').onClick(onClick)
	let renderSystemsTab = new UI.Text(RENDER_SYSTEMS).setTextTransform('uppercase').onClick(onClick)

	let tabs = new UI.Div()
	tabs.setId('tabs')
	tabs.add(initSystemsTab, logicSystemsTab, renderSystemsTab)
	container.add(tabs)

	//

	let initSystems = new UI.Span()
	
	container.add(initSystems)

	let logicSystems = new UI.Span()
	
	container.add(logicSystems)

	let renderSystems = new UI.Span()
	
	container.add(renderSystems)

	const select = (section) => {
		initSystemsTab.setClass('')
		logicSystemsTab.setClass('')
		renderSystemsTab.setClass('')

		initSystems.setDisplay('none')
		logicSystems.setDisplay('none')
		renderSystems.setDisplay('none')

		switch (section) {
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
          
    const signals = editor.signals
    
    let activeSection
    let activeFile
    
    socket.on('files fetched', (section, files) => {
        let ul = document.createElement('ul')
        ul.className = 'file-list'
        
        for (let file of files) {
            let li = document.createElement('li')
            
            li.addEventListener('click', () => {
                socket.emit('fetch file', section, file)
                activeSection = section
                activeFile = file
            })
            
            li.textContent = file
            
            ul.appendChild(li)
        }
        
        switch (section) {
			case `${SYSTEMS}/${INIT_SYSTEMS}`:
				initSystems.add(new UI.Element(ul))
				break
			case `${SYSTEMS}/${LOGIC_SYSTEMS}`:
				logicSystems.add(new UI.Element(ul))
				break
			case `${SYSTEMS}/${RENDER_SYSTEMS}`:
				renderSystems.add(new UI.Element(ul))
				break
		}
    })

	socket.emit('fetch files', `${SYSTEMS}/${INIT_SYSTEMS}`)
	socket.emit('fetch files', `${SYSTEMS}/${LOGIC_SYSTEMS}`)
	socket.emit('fetch files', `${SYSTEMS}/${RENDER_SYSTEMS}`)
	
	socket.on('file fetched', file => {
		signals.editScript.dispatch(file)
	})

	const scriptContainer = new UI.Panel()
	scriptContainer.setId('script-editor')
	scriptContainer.setPosition('absolute')
	scriptContainer.setBackgroundColor('#272822')
	scriptContainer.setDisplay('none')
	
	document.body.appendChild( scriptContainer.dom )
	
	const codeEditor = ace.edit('script-editor')
    codeEditor.setTheme('ace/theme/monokai')
    codeEditor.getSession().setMode('ace/mode/javascript')
	
	signals.editScript.add(script => {
		codeEditor.setValue(script, 1)
		codeEditor.focus()
		
		scriptContainer.setDisplay('')
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