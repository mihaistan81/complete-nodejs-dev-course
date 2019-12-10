const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: { 
        type: String, required: true, trim: true 
    },
    completed: { 
        type: Boolean, default: false 
    }
})

// const newTask = new Task( { 
//     description: 'Eat lunch  ', 
//     completed: false 
// } );
// newTask.save().then(() => {
//     console.log(newTask);
// }).catch((err) => {
//     console.log(err);
// });

module.exports = Task;