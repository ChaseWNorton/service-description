const createProxy = require("micro-proxy");
const proxy = createProxy([
  {
    pathname: "/dog",
    method: ["GET", "POST", "OPTIONS"],
    dest: "http://localhost:3000"
  },
  { pathname: "/boy", dest: "http://localhost:3001" }
]);

proxy.listen(9001, err => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on http://localhost:9001`);
});
