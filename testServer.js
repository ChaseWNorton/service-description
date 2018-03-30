const micro = require("micro");
const url = require("url")
const { send } = micro;
const { router, get } = require("microrouter");
const next = require("next");

const isProd = process.env.NODE_ENV === "production";
const app = next({ dev: !isProd });
const handle = app.getRequestHandler();

async function setup(handler) {
  await app.prepare();
  return handler;
}

module.exports = setup((req, res) => {
  const parseUrl = url.parse(req.url);
  if (parseUrl.pathname === "/dog") {
    return send(res, 200, "Hello Dog");
  }
});
