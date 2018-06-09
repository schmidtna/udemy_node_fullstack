console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

//if we log process.argv, the 3rd item on the list will be any command we input, so we pull that index 
const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('yargs', yargs.argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title in use.');
    }
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found')
        notes.logNote(note);
    } else {
        console.log('Note not found.')
    };     
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    //ternary operator, condition ? truthy expression : falsy expression
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized')
};

