const fs = require('fs');
const path = require('path');
const neededAdress = path.join(__dirname, '../03-files-in-folder/secret-folder');

fs.readdir(neededAdress, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
        console.log("Current directory filenames:");
        files.forEach(file => {
            if (file.isFile()) {
                fs.stat(path.join(neededAdress, file.name), (error, stats) => {
                    if (error) {
                        console.log(error);
                    } else {
                        const name = file.name.split('.')[0];
                        const extansion = file.name.split('.')[1];
                        const size = (stats.size / 1024).toFixed(3);
                        return console.log(`${name} - ${extansion} - ${size}kb`);
                    }
                });
            }
        });
    }
});