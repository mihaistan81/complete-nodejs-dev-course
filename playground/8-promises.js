const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1,2,3])
        //reject('We have an error!')
    }, 2000)
})

doWorkPromise.then( (result) => {
    console.log('Great Success!', result)
}).catch( (error) => {
    console.log('Big Error!', error)
})