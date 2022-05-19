const { createClient } = require("redis");

const client = createClient({
  // host: "127.0.0.1",
  // port: 6379,
  url: `redis://:3lKawWGSPl9C6RiKSv20zLSyOQgcjQPU@redis-15084.c98.us-east-1-4.ec2.cloud.redislabs.com:15084`,
});

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("You're now connected db redis ...");
  });
})();

module.exports = client;
