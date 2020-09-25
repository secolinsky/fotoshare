const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function listDirectoryFiles(dirpath) {
  // opendir returns a stream
  let dir = await fs.promises.opendir(dirpath);
  for await (let entry of dir) {
    if (entry.isFile()) {
      let name = entry.name;
      // resize image to 800 x 400
      let photoSource = fs.createReadStream(path.join('photos',name));
      let photoDestination = fs.createWriteStream(path.join('photos','fotoshare',name));

      photoSource
        .on("error", e => console.log(e))
        .pipe(sharp().resize(800, 400))
        .pipe(photoDestination)
        .on("finish", () => console.log("Success"))

      
    }

  }
}

listDirectoryFiles("/home/secolinsky/projects/fotoshare/server/photos")
