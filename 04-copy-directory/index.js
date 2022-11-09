const fs = require('fs');
const path = require('path');
const directFolder = path.join(__dirname, '../04-copy-directory/files');
const directCopy = path.join(__dirname, '../04-copy-directory/files-copy');

    fs.access(directCopy, (err) => {
        if (err) {
            fs.mkdir(directCopy, { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
            console.log('Directory created successfully!');
            });
        } else {
            
        }
    });

    fs.readdir(directCopy, function (err, files) {

        files.forEach(file => {
          fs.unlink(path.join(directCopy, file), (err) => {
            if (err) {
            console.error(err);
            return;
            }
          });
        });
      });  

    fs.readdir(directFolder, { withFileTypes: true }, (err, files) => {
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