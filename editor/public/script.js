/*global UI*/
/*global io*/

const ScriptSidebar = function ( editor ) {
	const COMPONENTS = 'components'
	const SYSTEMS = 'systems'
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
	// .add(
	// 	new UI.Text('components tav')
	// )
	
	container.add(components)

	let systems = new UI.Span()
	// .add(
	// 	new UI.Text('systems tab')
	// )
	
	container.add(systems)

	let entities = new UI.Span()
	// .add(
	// 	new UI.Text('entities tab')
	// )
	
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
          
	const socket = io.connect('https://gg-ggnore.c9users.io')
    
    socket.on('files fetched', (section, files) => {
        let ul = document.createElement('ul')
        
        for (let file of files) {
            let li = document.createElement('li')
            
            li.addEventListener("click", () => {
                // socket.emit('fetch file', file)
                // currentFIle = file
                console.log(file)
            })
            
            li.textContent = file
            
            ul.appendChild(li)
        }
        
        switch (section) {
			case COMPONENTS:
				components.add(new UI.Element(ul))
				break
			case SYSTEMS:
				systems.add(new UI.Element(ul))
				break
			case ENTITIES:
				entities.add(new UI.Element(ul))
				break
		}
    })

	socket.emit('fetch files', COMPONENTS)
	socket.emit('fetch files', SYSTEMS)
	socket.emit('fetch files', ENTITIES)
	
	return container
}

// Make three editor sidebar not crash
Sidebar.Script = function (editor) {
	var container = new UI.CollapsiblePanel()
	// container.setCollapsed( editor.config.getKey('ui/sidebar/script/collapsed'))
	// container.onCollapsedChange( function (boolean) {
	// 	editor.config.setKey('ui/sidebar/script/collapsed', boolean)
	// })
	
	container.setDisplay('none')

	// container.addStatic(new UI.Text('Script').setTextTransform('uppercase'))
	// container.add(new UI.Break())

	// const socket = io.connect('https://gg-ggnore.c9users.io')
          
 //   socket.on('files fetched', files => {
 //       let ul = document.createElement('ul')
        
 //       for (let file of files) {
 //           let li = document.createElement('li')
            
 //           li.addEventListener("click", () => {
 //               // socket.emit('fetch file', file)
 //               // currentFIle = file
 //               console.log(file)
 //           })
            
 //           li.textContent = file
            
 //           ul.appendChild(li)
 //       }
        
 //       var scriptsContainer = new UI.Element(ul)
	// 	container.add(scriptsContainer)
 //       // container.add(new UI.Element(ul))
 //   })

	// socket.emit('fetch files', 'components')

	return container
}