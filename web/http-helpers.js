var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};



exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};


exports.sendResponse = function(response, content, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(content);
};

exports.archiveOrServe = function(request, response, content, statusCode) {
  // 1. parse the url
  var requestUrl = JSON.parse(request.data);
  // 2. pass parsed url to helper functions
  archive.addUrlToList(requestUrl, function() {});
  // 3. based on the output from check, do:
       // a: add url to list and schedule for archive
       // b: serve up archived page
}

exports.processData = function(request, callback) {
  data = "";
  request.on('data', function(chunk) {
    data += chunk;
  });

  request.on('end', function() {
    callback(JSON.parse(data));
  });
}

// As you progress, keep thinking about what helper functions you can put here!
