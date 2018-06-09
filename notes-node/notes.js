console.log('starting notes.js');

const fs = require('fs');

//try to open file, if not there return empty array, this way we add to existing file vs overwrite each time.
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
       return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;            
    }   
};

var getAll = () => {
    return fetchNotes();
};

//fetch, filter, return
var getNote = (title) => {
    var notes = fetchNotes();
    var whichNote = notes.filter((note) => note.title === title);
    return whichNote[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var updateNotes = notes.filter((note) => note.title !== title );
    saveNotes(updateNotes);

    return notes.length !== updateNotes.length;
};

var logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    // addNote: addNote - es6 syntax below is equivalent
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};