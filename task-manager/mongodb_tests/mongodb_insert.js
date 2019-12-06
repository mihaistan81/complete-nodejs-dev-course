// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, { useNewUrlParser: true,  useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to the DB!')
    }
    // console.log('Connected correctly!')
    
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: "Mihai",
        age: 38
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            name: "Jen",
            age: 28
        },
        {
            name: "Gunther",
            age: 27
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description: "First task",
            completed: true
        },
        {
            description: "Second task",
            completed: false
        },
        {
            description: "Third task",
            completed: false
        }
    ], (error, result) => {
        if(error) {
            console.log('Unable to add tasks');
        } 

        console.log(result.ops)
    })
})
