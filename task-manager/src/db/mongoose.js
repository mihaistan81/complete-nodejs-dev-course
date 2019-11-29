const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if(validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('The password cannot contain \'password\'');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
})

// const me = new User({ name: '  Mihai  ', email: 'mike@VERSATILE.ro   ', password: 'phone1234' });
// me.save().then( () => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// });

const Task = mongoose.model('Task', {
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false }
})

const newTask = new Task( { 
    description: 'Eat lunch  ', 
    completed: false 
} );
newTask.save().then(() => {
    console.log(newTask);
}).catch((err) => {
    console.log(err);
});