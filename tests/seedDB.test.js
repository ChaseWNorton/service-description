const fake = require('faker');
const Model = require('../database/models/details.js');
const mongoose = require('mongoose');
require('events').EventEmitter.prototype._maxListeners = 1000;
const pg = require('pg');
const connect = "postgres://chasenorton:happyfeet@localhost:5432/chasenorton";
const client = new pg.Client(connect);
client.connect();

function seedDB(outer, inner) {
  // let counter = 0;
  // for (let j = 0; j < 1000; j++) {
  //   let inputArr = [];
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        let obj = {
          // id: counter,
          details: fake.lorem.paragraphs(),
          // photos: [`${fake.image.imageUrl()}?random=${Date.now() * Math.random()}`, `${fake.image.imageUrl()}?random=${Date.now() * Math.random()}`, `${fake.image.imageUrl()}?random=${Date.now() * Math.random()}`],
        };
        // inputArr.push(obj);
        client.query("INSERT into description (details, photos) values ('" + obj.details + "','{2,3,4}')")
        /*?*/

      }
    }
    // console.log('done');
    // await Model.Details.insertMany(inputArr);
}

describe('test data insertion', () => {
  // beforeAll (() => {
  //   let connection = mongoose.connect('mongodb://localhost/meetup_details');
  // });

  // test('insert 100k records at once into db', () => {
  //   seedDB.js(10, 10000);
  //   Model.Details.count({}).then(res => expect(res).toEqual(100000));
  // })

  test('insert 5k records at once into db', () => {
    seedDB(1000, 10000);
    // Model.Details.count({}).then(res => expect(res).toEqual(5000));
    // mongoose.connection.close();
  })

})