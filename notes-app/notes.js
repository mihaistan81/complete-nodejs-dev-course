const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes...";
}
const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter( (note) => note.title === title );
    const duplicateNote = notes.find( (note) => note.title === title );

    if( !duplicateNote ) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        
        console.log(chalk.bold.green('Note was added!'));
    } else {
        console.log(chalk.bold.red('Duplicate title - Note not added!'));
    }    
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);

    console.log('After:'); console.log(notes);
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json'); 
        const notesJSON = notesBuffer.toString();
        const notes = JSON.parse(notesJSON);
        console.log('Before:'); console.log(notes);
        
        return notes;
    } catch(e) {
        console.log('Error: '+ e);
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    var filteredNotes = notes.filter(function(note) {
        return note.title !== title
    });

    if( filteredNotes.length !== notes.length ) {
        saveNotes(filteredNotes);
        
        console.log(chalk.bold.green('Note was removed!'));
    } else {
        console.log(chalk.bold.red('Note was NOT found to be removed!'));
    }
}

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach( note => console.log('- '+ note.title) )
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find( (note) => note.title === title );
    
    if( foundNote ) {
        console.log(chalk.bold.green('Title: '+ foundNote.title) + '\nBody: '+ foundNote.body) 
    } else {
        console.log(chalk.bold.red('Title \''+ title + '\' NOT found !'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}