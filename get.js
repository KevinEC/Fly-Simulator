let fs = require('fs');
let data;
fs.readdir('impulses/', (err, files) => {
  if (err) throw err;
  data = files;
});

console.log(data);