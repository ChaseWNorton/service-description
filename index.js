const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Model = require("./database/models/details");
const redisClient = require("redis").createClient;
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const redis = redisClient(6379, "localhost");
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/events/:id/details", (req, res) => {
    const eventId = req.params.id;
    // app.render(req, res, "/details", queryParams);
    redis.get(eventId, function(err, reply) {
      if (err) console.log(err);
      else if (reply) {
        app.render(req, res, "/details", reply);
      } else {
        mongoose.connect("mongodb://localhost/meetup_details");
        Model.Details.findOne({ id: eventId })
          .select("-_id")
          .then(data => {
            redis.set(`${eventId}`, JSON.stringify(data));
            app.render(req, res, "/details", reply);
          });
      }
    });
  });

  server.get("/api/event/:eventid", (req, res) => {
    const eventId = `${req.params.eventid}`;
    const actualPage = "/event/44/post";
    redis.get(eventId, function(err, reply) {
      if (err) console.log(err);
      else if (reply) {
        app.render(req, res, actualPage, eventId);
      } else {
        mongoose.connect("mongodb://localhost/meetup_details");
        Model.Details.findOne({ id: eventId })
          .select("-_id")
          .then(data => {
            redis.set(`${eventId}`, JSON.stringify(data));
            app.render(req, res, actualPage, eventId);
          });
      }
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
