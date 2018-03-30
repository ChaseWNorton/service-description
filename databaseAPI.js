const url = require("url");
const mongoose = require("mongoose");
const { send } = require("micro");
const Model = require("./database/models/details");
const redisClient = require("redis").createClient;
const redis = redisClient(6379, "localhost");

module.exports = (req, res) => {
  const eventId = url.parse(req.url, true).path.substr(1);
  redis.get(eventId, function(err, reply) {
    if (err) console.log(err);
    else if (reply) {
      return send(res, 200, reply);
    } else {
      mongoose.connect("mongodb://localhost/meetup_details");
      Model.Details.findOne({ id: eventId })
        .select("-_id")
        .then(data => {
          redis.set(`${eventId}`, JSON.stringify(data));
          return send(res, 200, data);
        });
    }
  });
};
