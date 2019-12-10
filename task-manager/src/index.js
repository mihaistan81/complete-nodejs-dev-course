const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if(req.method) {
//         res.status(503).send('The site/api is in maintenance')
//     }
// })

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

const main = async () => {
    // const task = await Task.findById('5defc4fd248abc5208e4517e')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5defc441a2518d84c865c378')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()