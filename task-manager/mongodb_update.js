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

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('5dcadbd2ff67bc2bac9639bf')
    }, {
        $set: {
            name: "Grigore"
        }
    }).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })

    db.collection('users').updateOne({
        _id: new ObjectID('5dcadbd2ff67bc2bac9639bf')
    }, {
        $inc: {
            age: 1
        }
    }).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany( {
        completed: false
    }, {
        $set: { completed: true }
    }).then( (result) => {
        console.log(result.modifiedCount)
    }).catch( (error) => {
        console.log(error)
    })
})
