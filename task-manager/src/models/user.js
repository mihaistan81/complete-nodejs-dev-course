const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User;