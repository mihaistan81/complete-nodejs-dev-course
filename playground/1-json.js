const fs = require('fs');

// Content:    {"name":"Andrew","planet":"Earth","age":27}
const personBuffer = fs.readFileSync('1-json.json');
const personJSON = personBuffer.toString();
const person = JSON.parse(personJSON); 
person.name = "Mihai"
person.age = 38

const personJSONModified = JSON.stringify(person);
console.log(personJSONModified);
fs.writeFileSync('1-json.json', personJSONModified);