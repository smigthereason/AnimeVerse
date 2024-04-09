// Import the cors-anywhere package
const corsProxy = require('cors-anywhere');

// Start the cors-anywhere server
corsProxy.createServer({
  // Set the origin to allow requests from any domain
  origin: '*',
}).listen(8080, () => {
  console.log('CORS proxy server listening on port 8080');
});