const fs = require("fs");
const path = require("path");

// imported module has side-effect of
// giving total size of a nested directory
// we use a utility function to output
// size of each file in dirpath
const cb = require("./getTotalSize.js");

// utility function that outputs size for each file in a directory
async function listDirectory(dirpath) {
  let dir = await fs.promises.opendir(dirpath);
  for await (let entry of dir) {
    let name = entry.name;
    if (entry.isDirectory()) {
      name += "/"; // Add a trailing slash to subdirectories
    }
    let stats = await fs.promises.stat(path.join(dirpath, name));
    let size = cb.convertBytes(stats.size);

    console.log(String(size).padStart(10), name);
  }
}

// argument to be a path of some directory or file
listDirectory(process.argv[2])
