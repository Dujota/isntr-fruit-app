const mongoose = require('mongoose');

// 1st define the shape of the object we want to store
// in our database -- SCHEMA
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

// Tell Mongoose that the model we want to generate is based off
// the schema and provide a name to it
// mongoose.model("Name", schema)

const Fruit = mongoose.model('Fruit', fruitSchema);

// share it with the rest of your application
// module.exports = modelName
module.exports = Fruit;

// const tesla = {
//   make: "Tesla"
//   model: "3"
//   manufacturer: "tesla",
//   year: 2023
//   color: white
//   fuel: electric
//   options: [
//     op1,op2,op3
//   ],
//   something: true
// }
// const ford = {
//   make: "ford"
//   model: "mustang"
//   manufacturer: ford,
//   year: 2023
//   color: red
//   fuel:gas
//   options: [
//     op1,op2,op3
//   ]
//   somehting: false
// }
