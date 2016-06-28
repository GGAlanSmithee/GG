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
	const ENTITIES = 'entities'
	
	let container = new UI.Panel()
	container.setId('script-sidebar')

	const onClick = (event) => {
		select(event.target.textContent)
	}
	
	let componentsTab = new UI.Text(COMPONENTS).setTextTransform('uppercase').onClick(onClick)
	let systemsTab = new UI.Text(SYSTEMS).setTextTransform('uppercase').onClick(onClick)
	let entitiesTab = new UI.Text(ENTITIES).setTextTransform('uppercase').onClick(onClick)

	let tabs = new UI.Div()
	tabs.setId('tabs')
	tabs.add(componentsTab, systemsTab, entitiesTab)
	container.add(tabs)

	//

	let components = new UI.Span()
	
	container.add(components)

	let initSystems = new UI.Span()
	
	let logicSystems = new UI.Span()
	
	let renderSystems = new UI.Span()
	
	let systems = new UI.Span().add(new UI.Panel().add(new UI.Text('init systems'), initSystems),
									new UI.Panel().add(new UI.Text('logic systems'), logicSystems),
									new UI.Panel().add(new UI.Text('render systems'), renderSystems))
	
	container.add(systems)

	let entities = new UI.Span()
	
	container.add(entities)

	const select = (section) => {
		componentsTab.setClass('')
		systemsTab.setClass('')
		entitiesTab.setClass('')

		components.setDisplay('none')
		systems.setDisplay('none')
		entities.setDisplay('none')

		switch (section) {
			case COMPONENTS:
				componentsTab.setClass('selected')
				components.setDisplay('')
				break
			case SYSTEMS:
				systemsTab.setClass('selected')
				systems.setDisplay('')
				break
			case ENTITIES:
				entitiesTab.setClass('selected')
				entities.setDisplay('')
				break
		}
	}

	select(COMPONENTS)
          
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
			case COMPONENTS:
				components.add(new UI.Element(ul))
				break
			case `${SYSTEMS}/${INIT_SYSTEMS}`:
				initSystems.add(new UI.Element(ul))
				break
			case `${SYSTEMS}/${LOGIC_SYSTEMS}`:
				logicSystems.add(new UI.Element(ul))
				break
			case `${SYSTEMS}/${RENDER_SYSTEMS}`:
				renderSystems.add(new UI.Element(ul))
				break
			case ENTITIES:
				entities.add(new UI.Element(ul))
				break
		}
    })

	socket.emit('fetch files', COMPONENTS)
	socket.emit('fetch files', `${SYSTEMS}/${INIT_SYSTEMS}`)
	socket.emit('fetch files', `${SYSTEMS}/${LOGIC_SYSTEMS}`)
	socket.emit('fetch files', `${SYSTEMS}/${RENDER_SYSTEMS}`)
	socket.emit('fetch files', ENTITIES)
	
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