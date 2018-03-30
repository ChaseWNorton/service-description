const fake = require("faker");
const Model = require("./database/models/details.js");
const mongoose = require("mongoose");
const co = require("co");
require("events").EventEmitter.prototype._maxListeners = 100;

mongoose.connect("mongodb://localhost/meetup_details");
function* magic() {
  let counter = 0;
  for (let j = 0; j < 100000; j++) {
    let inputArr = [];
    for (let i = 0; i < 1000; i++) {
      let obj = {
        id: counter,
        details: fake.lorem.paragraphs(),
        photos: [
          `${fake.image.imageUrl()}?random=${Date.now() * Math.random()}`,
          `${fake.image.imageUrl()}?random=${Date.now() * Math.random()}`,
          `${fake.image.imageUrl()}?random=${Date.now() * Math.random()}`
        ]
      };
      inputArr.push(obj);
      counter++;
      console.log(counter);
    }
    console.log(`done${j}`);
    let taco = yield Model.Details.insertMany(inputArr);
  }
}

let it = magic();
for (let keys of it) {
  console.log("working");
}
