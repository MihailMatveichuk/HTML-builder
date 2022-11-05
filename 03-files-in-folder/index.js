const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const neededAddress = path.join(__dirname, '../03-files-in-folder/secret-folder');

readdir(neededAddress, { withFileTypes: true }).then(data => data.forEach(file => {

    if (file.isFile()) {
        fs.stat(path.join(neededAddress, file.name), (error, stats) => {
            if (error) {
                console.log(error);
            } else {
                const name = file.name.split('.')[0];
                const extension = file.name.split('.')[1];
                const size = (stats.size / 1024).toFixed(3);
                return console.log(`${name} - ${extension} - ${size}kb`);
            }
        });
    }
    
}));