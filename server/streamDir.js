const fs = require("fs");
const path = require("path");

// utility function that outputs size in bytes for each file in a directory
async function listDirectory(dirpath) {
  let dir = await fs.promises.opendir(dirpath);
  for await (let entry of dir) {
    let name = entry.name;
    if (entry.isDirectory()) {
      name += "/"; // Add a trailing slash to subdirectories
    }
    let stats = await fs.promises.stat(path.join(dirpath, name));
    let size = stats.size;

    console.log(String(size).padStart(10), name);
  }
}

// argument to be a path of some directory or file
listDirectory(process.argv[2])
