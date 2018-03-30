const mongoose = require('mongoose');

const detailsSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  details: String,
  photos: Array,

});

const Details = mongoose.model('details', detailsSchema);

module.exports.Details = Details;
