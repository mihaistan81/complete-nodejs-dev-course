const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer')
const upload = multer({ 
    dest: 'images',
    limits:  {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File must be a Word document'))
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload-me'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is on port ' + port);
});

// const jsonwebtoken = require('jsonwebtoken');
// const myFunction = async () => {
//     const jwtToken =  jsonwebtoken.sign({ _id: 'dummyID' }, 'vwddf234w46g4@7', { expiresIn: '1 day'})
//     console.log(jwtToken);

//     const data = jsonwebtoken.verify(jwtToken, 'vwddf234w46g4@7')
//     console.log(data)
// }

// myFunction()

const Task = require('./models/task')
const User = require('./models/user')
