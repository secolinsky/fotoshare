const getFotos = require('./getFotos.js');
const fs = require("fs");
const path = require("path");

// return original name of file to be retrieved again in Samba share
function newFileName(imagePath, re) {
  let [name, ext] = getFotos.fileNameAndExt(imagePath);

  // do a try/catch block in case re match fails
  let match = name.match(re);
  let year, month, day, time, fn;
  if (match !== null) {
    year = match[1];
    month = match[2];
    day = match[3];
    hours = match[4];
    minutes = match[5];
    seconds = match[6];
    fn = `${year}${month}${day}_${hours}${minutes}${seconds}`

    return [fn, ext].join('.');
  } else {
    throw new Error("No RE to catch the file name");
  }
}

function getFilesize(filename) {
  let stats = fs.statSync(filename);
  let fileSize = stats.size;
  return fileSize;
}

function isEmpty(filename) {
  let size = getFilesize(filename);
  if (size === 0) {
    return true;
  } else {
    return false
  }
}

async function listFiles(dir) {
  let myList = await fs.promises.readdir(dir, {withFileTypes: true});
  let filteredList = await myList.filter( entry => entry.isFile() )
                                 .filter( entry => isEmpty(path.join('./photos',entry.name)) )
                                 .map( file => file.name)
  return filteredList;
}

function fetchSequentially(photos) {
  // We'll store the photos here as we fetch and operate on them
  const operatedPhotos = [];

  // Start with a Promise that will fulfill right away with value undefined
  let p = Promise.resolve(undefined);

  // Now loop through the desired URLs, building a Promise chain
  // of arbitrary length, operating one photo at each stage of the chain
  for(let photo of photos) {
    p = p.then( () => getFotos.writeP(photo) );
  }

  // when the last Promise in that chain is fulfilled, then the
  // operatedPhotos array is ready.  so let's return a Promise for
  // that operatedPhotos array.  Note that we don't include any error
  // handlers: we want to allow errors to propagate to the caller.
  return p.then( () => operatedPhotos );
}


async function writeRemaining(photos) {
  let reDate = /^(\d{4})-(\d{2})-(\d{2})@(\d{2}):(\d{2}):(\d{2})/u;
  // myList contains all files that have a file size of null from first iteration
  // of getFotos
  let myList = photos.map(photo => newFileName(path.join('photos', photo), reDate));
  let p = await fetchSequentially(myList);

  return p;
}


listFiles('./photos').then(list => writeRemaining(list)).catch(e=>console.log(e))





