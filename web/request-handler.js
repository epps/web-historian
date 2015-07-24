var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!


exports.serveRoot = function (request, response) {
  if (request.method === "GET") {
    fs.readFile('./public/index.html', function(error, content) {
      if (error) {
        console.log(content);
        helpers.sendResponse(response, "Internal server error", 500);
      } else {
        helpers.sendResponse(response, content, 200);
        console.log(content);
      }
    })
  } else if (request.method === "POST") {
    // helpers.processData(request, function(url) {
    //   archive.createPath(url, function(uriPath) {
    //     if (archive.isUrlArchived(uripath), function() {
    //       fs.readFile('./public/index.html', function(error, content) {
    //       if (error) {
    //         console.log(content);
    //         helpers.sendResponse(response, "Internal server error", 500);
    //       } else {
    //         helpers.sendResponse(response, content, 200);
    //         console.log(content);
    //       }
    //     });
  });

        // check if the url exists
          // if so, send back the archived data
          // if not, send back the loading page

          // helpers.sendResponse(201, message);
    });
  } else {
    helpers.sendResponse(response, "Sorry, this request was not recognized", 400);
  }
};

// how to serve a static file:
// http://ericsowell.com/blog/2011/5/6/serving-static-files-from-node-js





