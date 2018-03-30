const url = require("url");
const next = require("next");
const app = next({ dev: false });
const handle = app.getRequestHandler();

async function setup(handler) {
  await app.prepare();
  return handler;
}

module.exports = setup((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  // console.log(parseUrl.origin);
  if (parsedUrl.path.includes("events/details?post=")) {
	console.log('hi');
    return app.render(req, res, "/details", parsedUrl.query);
  } else {
    return handle(req, res, parsedUrl);
  }
});
