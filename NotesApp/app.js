// app js

const addNote = (id, content) => {
    createNote(id, content)
}

// creating components

const createNote = (id, content) => {

    var _id = uuidv4();

    if (id !== null) {
        var _id = id
    }


    const container = document.getElementById('notes-container')

    const note = document.createElement('div')
    note.classList.add('note')
    note.id = _id

    const menu = document.createElement('div')
    menu.classList.add('menu')

    menu.innerHTML = '<div></div>\n<div class="btn-grp">\n<span class="edit-btn"><i class="fa fa-save" aria-hidden="true"></i></span>\n<span class="del-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></span>\n</div>'

    const textArea = document.createElement('textarea')
    textArea.name = "note"
    textArea.classList.add('note-content')
    textArea.cols = "25"
    textArea.rows = "12"
    textArea.value = content

    note.appendChild(menu)
    note.appendChild(textArea)
    container.appendChild(note)

    document.getElementById(_id).querySelector('span:nth-child(1)').addEventListener('click', () => {
        // add storage mechanism
        saveNote(_id, textArea.value)
        console.log(`Saved Note : ${_id}`)
    })
    document.getElementById(_id).querySelector('span:nth-child(2)').addEventListener('click', () => {
        // add storage mechanism
        delNote(_id)
        console.log(`Deleted Note : ${_id}`)
        note.remove()
    })
}



// listeners

window.onload = () => {

    document.getElementById('add-note').addEventListener('click', () => {
        addNote(null, '');
    })

    setupStorage();
    fetchNotes();
}

// storage handlers
const setupStorage = () => {
    if (!localStorage.getItem('notes')) {
        localStorage.setItem('notes', JSON.stringify([]))
    }
}

const saveNote = (id, content) => {
    notes = JSON.parse(localStorage.getItem('notes'))

    const updateNote = (note) => {
        if (note.id === id) {
            return false
        }
        return true
    }

    console.log(notes)
    notes = notes.filter(updateNote)
    console.log(notes)
    notes.push({
        id: id,
        content: content
    })

    localStorage.setItem('notes',
        JSON.stringify(notes)
    )
}

const delNote = (id) => {
    var notes = JSON.parse(localStorage.getItem('notes'))

    const checkItem = (note) => {
        if (note.id !== id) {
            return true
        }
    }

    notes = notes.filter(checkItem)

    localStorage.setItem('notes', JSON.stringify(notes))
}

const fetchNotes = () => {

    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'))

        for (note of notes) {
            addNote(note.id, note.content)
        }
    }
}