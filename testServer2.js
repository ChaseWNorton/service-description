const micro = require("micro");
const url = require("url");
const { send } = micro;
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
  console.log(parseUrl);
  if (parseUrl.pathname === "/boy") {
    return send(res, 200, "Hello Boy");
  }
});
