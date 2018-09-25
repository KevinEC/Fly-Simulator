let budo = require('budo');
let babelify = require('babelify');

let fileNames;

let instance = budo('index.js', {
  live: true,             // live reload
  stream: process.stdout, // log to stdout
  port: 3000,             // use this as the base port
  browserify: {
    transform: babelify   // use ES6
  }
}).on('reload', function(ev) {
  let fs = require('fs');

	fs.readdir('impulses/', (err, files) => {
	  if (err) throw err;
  	  console.log(files);
  	  fileNames = files;
	});
  console.log("hay" + fileNames);

});

export default 12;



