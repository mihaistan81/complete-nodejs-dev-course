// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'This file was created by NodeJs! ');
// fs.appendFileSync('notes.txt', 'Some text appended ! ');
// console.log('Hi');

// const validator = require('validator');
// console.log(validator.isEmail('mihai.stan@gmail.com'));
// console.log(validator.isURL('http://mead.io'));

const notes = require('./notes.js');
console.log(notes.getNotes());

const chalk = require('chalk');
console.log(chalk.green.inverse.bold('Success!'));

const yargs = require('yargs');
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }, 
        body: {
            describe: 'Note description',
            demandOption: true,
            type:'string' 
        }
    },
    handler(argv) {
        //console.log('Title: ' + argv.title + '\nBody: '+ argv.body);
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        console.log('Removing a note!');
        notes.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler() {
        console.log(chalk.bold.inverse('Your notes'));
        notes.listNotes();
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        console.log(chalk.bold.inverse('Read a note!'));
        notes.readNote(argv.title);
    }
})

// add, remove, read, list

yargs.parse();
//console.log(yargs.argv);
