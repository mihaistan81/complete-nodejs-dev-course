require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndRemove('5de935c61aacc579183e3848').then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false });
// }).then((result2) => {
//     console.log(result2);
// }).catch(err => {
//     console.log(err);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndRemove(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTaskAndCount('5de938f1f0355072401a61b7').then((count) => {
    console.log(count);
}).catch(err => {
    console.log(err);
});