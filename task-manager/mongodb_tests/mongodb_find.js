// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)

MongoClient.connect(connectionUrl, { useNewUrlParser: true,  useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to the DB!')
    }
    
    const db = client.db(databaseName)

    db.collection('users').find({ age: 27 }).toArray( (error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: 27 }).count( (error, count) => {
        console.log(count)
    })

    db.collection('tasks').findOne({ _id: new ObjectID("5dcae0ea6659be62a80a5b59") }, (error, task) => {
        if(error) {
            console.log('Unable to get the task')
        }
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray( (error, tasks) => {
        console.log(tasks)
    })
})
