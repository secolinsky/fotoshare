const SambaClient = require("samba-client");
const path = require("path");
const credentials = require("./credentials.js");

// Access the stream API
// Use fs.promises.opendir
// opendir returns a Dir object representing the specified directory
// Use the read() method of Dir object to read one Dirent class at a time.
// https://nodejs.org/api/fs.html#fs_class_fs_dirent on fs.Dirent class
// https://nodejs.org/api/fs.html#fs_class_fs_dir on fs.Dire class
const fs = require("fs");

let client = new SambaClient({
  address: credentials.address,
  username: credentials.username,
  password: credentials.password,
  domain: "WORKGROUP"
});

// return an array with the name of file, and its extension
// extracted from the path of photo asset as string
function fileNameAndExt(str) {
  let file = path.basename(str);
  let last = file.lastIndexOf('.');
  return [ file.substr(0, last), file.substr(last + 1, file.length) ];
}

// <reDate> used in both newFileName and listFiles
let reDate = /^(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/u;      


// return new name of file to be displayed on React app
function newFileName(imagePath) {
  let [name, ext] = fileNameAndExt(imagePath);

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

// list files from samba directory <dir>
// that match a regular expression <regEx> and that
// have <fileExt> as their file extension.

// take getP and use async/ for await with Node > 12
async function listFiles(dir,regEx,fileExt) {
  let r = await client.listMyFiles(dir, regEx, '.jpg');    
  return r;
}

// getP writes to local hard drive a newly named copy from NAS pidrive
async function getP(photo) {
  let myPhoto = path.join(credentials.rootNASPath, photo)
  let exists = await client.fileExists(myPhoto);
  if (exists) {
    try {
      // getFile returns a promise
      let output = await client.getFile(myPhoto, path.join(__dirname, 'photos', newFileName(photo)));
      return output;
      /* console.log(`got test file from samba share at ${client.address}`) */
    } catch(err) {
      return Promise.reject( new Error("fucked error") )
    }
  } else {
    return Promise.reject( new Error("photo"+ photo + "doesn't exist") );
    /* console.log('photo ' + photo + ' does not exist'); */
  }
}

/* function getAllPhotos(l) {
 *   for(let photo of l) {
 *     getP(photo)
 *   }
 * } */
// an array of photo names without the hierarchy of directories
let myList = listFiles(credentials.rootNASPath + '/', reDate, '.jpg').then(result => console.log(result));
/* then(result =>
 *   result.map( item => getP(item) )
 * ).catch( err => console.log(err)); */


/* console.log(myList) */
/* getAllPhotos(myList) */
