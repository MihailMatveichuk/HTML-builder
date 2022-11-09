const fs = require('fs');
const path = require('path');
let directFolder =  path.resolve(__dirname, 'files');
let directCopy =  path.resolve(__dirname, 'files-copy');

    fs.mkdir(directCopy, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
        }
       return;
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

    fs.readdir(directFolder, (err, files) => {
          files.forEach(file => {
            fs.copyFile(path.resolve(directFolder, file), path.resolve(directCopy, file), (err)=>{
                if(err){
                    console.log(err);
                }
                return;
            });
          });
    });
});

