const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// for await used only for node version 12 or higher
async function listDirectoryFiles(dirpath) {
  // opendir returns a stream
  let dir = await fs.promises.opendir(dirpath);
  // fof to iterate items over objects
  for await (let entry of dir) {
    if (entry.isFile()) {
      let name = entry.name;
      // resize image to 800 x 400
      let photoSource = fs.createReadStream(path.join('photos',name));
      let photoDestination = fs.createWriteStream(path.join('photos','fotoshare',name));

      photoSource
        .on("error", e => console.log(e))
        .pipe(sharp({ failOnError: false }).resize(800, 400,{ fit: 'inside' }))
        .pipe(photoDestination)
        .on("finish", () => console.log("Success"))

      
    }

  }
}

listDirectoryFiles(process.argv[2])
