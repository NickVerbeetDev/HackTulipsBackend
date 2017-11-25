const config = require('../../config/config');
const app = require('../../app');
const http = require('http');
const normalizePort = require('normalize-port');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
