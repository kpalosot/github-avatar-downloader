var myArgs = process.argv.slice(2);
const fs = require("fs");
//const https = require("https");
const request = require("request");

// const client_id = "Iv1.96214668bb039dda";
// const client_secret = "9898512b97a5a458181b5565627af689de8f00ef";

// const app = require('express')();

// WORKING CODE FOR MAKING DIRECTORIES
fs.mkdir("./avatars", err =>{
  if(err){
    return console.error(err);
  }
  console.log("Director created successfully!");
});

var options ={
  url: `https://api.github.com/repos/${myArgs[0]}/${myArgs[1]}`,
  // url: `https://api.github.com/repos/nodejs/node`,
  headers: {
    'User-Agent': 'application/json'
  }
};

function callback(err, res, body){
  if(err){
    console.error(err);
  }
  let info = JSON.parse(body);
  options.url = info.contributors_url;

  let newOptions = {
    url : info.contributors_url,
    headers : {
      'User-Agent': 'application/json'
    }
  };

  request(newOptions, (err, res, body) => {
    var newInfo = JSON.parse(body);
    for(var item of newInfo){
      request(item.avatar_url).pipe(fs.createWriteStream(item.login));
    }
  });

}

request(options, callback);








