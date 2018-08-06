var myArgs = process.argv.slice(2);
const fs = require("fs");
const request = require("request");

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

function getContributors(err, res, body){
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

  request(newOptions, getAvatars);

}

function getAvatars(err, res, body){
  var info = JSON.parse(body);
  for(var item of info){
    request(item.avatar_url).pipe(fs.createWriteStream(`./avatars/${item.login}`));
  }
}

request(options, getContributors);








