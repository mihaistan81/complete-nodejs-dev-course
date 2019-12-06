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

    // db.collection('users').insertMany([
    //     { name: "Ionel", age: 45 }, { name: "Gigel", age: 45 }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').deleteMany({
    //     age: 45
    // }).then( (result) => {
    //     console.log('Deleted elements: ', result.deletedCount)
    // }).catch( (error) => {
    //     console.log(error)
    // })

    db.collection('tasks').insertMany([
        { description: "Row to be deleted", completed: true }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents')
        }
        console.log(result.ops)
    })

    db.collection('tasks').deleteMany({
        description: "Row to be deleted"
    }).then( (result) => {
        console.log('Deleted elements: ', result.deletedCount)
    }).catch( (error) => {
        console.log(error)
    })
})
