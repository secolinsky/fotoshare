const SambaClient = require("samba-client");
const path = require("path");
const credentials = require("./credentials.js");

const fs = require("fs");

let client = new SambaClient({
  address: credentials.address,
  username: credentials.username,
  password: credentials.password,
  domain: "WORKGROUP"
});
// two photos: 20161101_180213.jpg and 20161212_203754.jpg


function fileNameAndExt(str) {
  let file = path.basename(str);
  let last = file.lastIndexOf('.');
  return [ file.substr(0, last), file.substr(last + 1, file.length) ];
}

function newFileName(imagePath) {
  let [name, ext] = fileNameAndExt(imagePath);
  let reDate = /^(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/u;

  // do a try/catch block in case re match fails
  let match = name.match(reDate);
  let year, month, day, time, fn;
  if (match !== null) {
    year = match[1];
    month = match[2];
    day = match[3];
    hours = match[4];
    minutes = match[5];
    seconds = match[6];
    fn = `${year}-${month}-${day}@${hours}:${minutes}:${seconds}`

    return [fn, ext].join('.');
  } else {
    throw new Error("No RE to catch the file name");
  }
}

// below is the first test file
// let p1 = 'pidrive1/20161101_180213.jpg';


// list files from samba directory
async function lf(dir) {
  try{
    let r = await client.listMyFiles(dir, '.jpg');
    console.log(`found these files \n${r.join('')}`);
    }
  catch(err) {
    console.error(err);
  }
}

// getP writes to local hard drive a newly named copy from NAS pidrive
async function getP(photo) {
  
  let exists = await client.fileExists(photo);
  if (exists) {
    // getFile returns a promise
    try {
      let output = await client.getFile(photo, path.join(__dirname, 'photos', newFileName(photo)));
      console.log(`got test file from samba share at ${client.address}`)
    } catch(err) {
      console.error(err)
    }
  } else {
    console.log('photo ' + photo + ' does not exist');
  }
}

// getP(p1);

// now to get files from the 'pidrive1/photos/photos/' directory
// to later feed to get

lf('pidrive1/photos/photos/')
