const fs = require('fs');
const path = require('path');
const directFolder = __dirname + '\\files';
const directCopy = __dirname + '\\files-copy';

function copyDir() {
    fs.access(path.join(directCopy), (err) => {
        if (err) {
            fs.mkdir(path.join(directCopy), { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });
            copyDir(directFolder, directCopy);
        } else {
            console.log('This directory has already exists');
        }
    });
    fs.copyFile(path.join(directFolder), path.join(directCopy),
        fs.constants.COPYFILE_EXCL, (err) => {
            if (err) {
                console.log("Error Found:", err);
            } else {
                console.log("\nFile Contents of copied_file:");
            }
        });
}

copyDir();