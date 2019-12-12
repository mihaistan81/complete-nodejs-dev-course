const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })

    } catch(e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(err) {
        res.status(400).send(err);
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(err) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch(err) {
        res.status(500).send()
    }
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return  res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user);
    } catch(err) {
        res.status(400).send(err);  
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user);
    } catch(err) {
        res.status(500).send(err);
    }
});

const upload_avatar = multer({ 
    //dest: 'avatars',
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('You should only upload a image with extension jpg|jpeg|png files!'))
        }

        cb(undefined, true)
    }

})
router.post('/users/me/avatar', auth, upload_avatar.single('avatar'), async (req, res) => {
    
    const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer()
    req.user.avatar = buffer
    await req.user.save()

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save();

    res.send()
}, (error, req, res, next) => {
    res.status(404).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
    // http://localhost:3000/users/5df215e63a2518852c60a9e0/avatar
    try {
        const user = await User.findById({ _id: req.params.id })

        if(!user || !user.avatar) {
            throw new Error('There is no user with this ID !')
        }

        res.set('Content-type', 'image/png')
        res.send(user.avatar)
    } catch(e) {
        res.status(404).send(e)
    }
})

module.exports = router