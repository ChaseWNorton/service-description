const url = require("url");
// const path = require("path");
const { send } = require("micro");

const fetch = require("isomorphic-unfetch");

module.exports = async (req, res) => {
  const eventId = url.parse(req.url, true).path.substr(1);
  const response = await fetch(`http://localhost:4002/${eventId}`);
  const data = await response.json();
  if (data) {
    return send(res, 200, data);
  } else return send(res, 404);
};
