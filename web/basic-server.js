var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var url = require('url');
var helpers = require('./http-helpers.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";

var router = {
  '/':  handler.serveRoot
}

var server = http.createServer(function(request, response) {
  var pathName = url.parse(request.url).pathname;
  if (router[pathName]) {
    router[pathName](request, response);
  } else {
    helpers.sendResponse(response, "Sorry, this page cannot be found", 404);
  }
});


if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}




