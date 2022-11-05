const fs = require('fs');
const path = require('path');
const directFolder = __dirname + '\\files';
const directCopy = __dirname + '\\files-copy';

function checkExist(){

    fs.access(path.join(directCopy), (err) => {
        if (err) {
            fs.mkdir(path.join(directCopy), { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
            console.log('Directory created successfully!');
            });
            copyDir();
        } else {
            console.log('This directory has already exists');
        }
    });

}

function copyDir() {

    fs.readdir(path.join(directFolder), { withFileTypes: true }, (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach(file => {
            fs.copyFile(path.join(directFolder, file.name), path.join(directCopy, file.name), (err)=>{
                if(err){
                    console.log(err);
                }
            });
          });
        }
    });

}

checkExist();
