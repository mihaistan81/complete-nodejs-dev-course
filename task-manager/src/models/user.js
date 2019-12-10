const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// accessible on the User instance object
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// accessible on the User instance object
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const jwtToken = jwt.sign({ _id: user._id.toString() }, 'vwddf234w46g4@7')

    user.tokens = user.tokens.concat({ token: jwtToken })
    await user.save()

    return jwtToken
}

// accesible in the User Model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before seving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

// const me = new User({ name: '  Mihai  ', email: 'mike@VERSATILE.ro   ', password: 'phone1234' });
// me.save().then( () => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// });

module.exports = User;