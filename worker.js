const mongoose = require('mongoose');
const data = require('./database/seed_data/data.json');
const photodata = require('./database/seed_data/mock_photo_data.json');


mongoose.connect('mongodb://localhost/meetup_details');

const fake = require('faker');
const testTime = () => {
  let obj;
  for (let i = 0; i < 10000000; i++) {
    let obj = {
      id: i,
      detail: fake.lorem.paragraph(),
      photos: [fake.image.imageUrl(), fake.image.imageUrl(), fake.image.imageUrl()]
    }
  }
  return obj
}

let output =
// const len = photodata.length;
//
// const output = [];
// data.events.forEach((event) => {
//   let i = 0;
//   const rand = Math.floor(Math.random() * 6);
//   const pics = [];
//   const temp = {};
//   temp.id = event.id;
//   temp.details = event.description;
//   temp.photos = [];
//   while (i < rand) {
//     const currentPic = photodata[Math.floor(Math.random() * len)].pictures;
//     if (pics.indexOf(currentPic) === -1) {
//       temp.photos.push(photodata[Math.floor(Math.random() * len)].pictures);
//       pics.push(currentPic);
//     }
//     i += 1;
//   }
//   output.push(temp);
// });

// iterate through each recently created obj, and save it to database;
// let counter = output.length;

output.forEach((entry) => {
  const singleEntry = new Model.Details(entry);
  singleEntry.save((err) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log(`added one entry in the database with the id of ${entry.id}`);
      if (counter === 0) {
        mongoose.disconnect();
      }
    }
  });
});
