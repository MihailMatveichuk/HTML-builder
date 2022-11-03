const fs = require('fs');
const path = require('path');
const {createReadStream, createWriteStream} = require('fs');
const {rm} = require('fs/promises');

const neededWay = path.join(__dirname, '../05-merge-styles/styles');
const bundleWay = path.join(__dirname, '../05-merge-styles/project-dist/bundle.css');

async function createCss(bundle){
   await rm(bundle, {force: true});
    fs.access(path.join(bundle), (err) => {
        if (err) {
            fs.open(path.join(bundle), 'w', (err) => {
                if(err) throw err;
                });
                copyDir(neededWay, bundleWay);
            } else {
                if(err){
                    console.error(err.message);
                    return;
                }
                console.log("File have already exist");
            } 
        });
    }

function copyDir(styleWay, bundle){

    fs.readdir(styleWay, { withFileTypes: true }, (err, files) => {
        if (err) console.log(err);
        else {

           let styleFiles = files.filter(file=>file.name.split('.')[1] === 'css');

           styleFiles.forEach(file=>{

              let readableStream = createReadStream(path.join(styleWay, file.name), 'utf8');
              let writeableStream = createWriteStream(bundle, {flags: 'a'});
 
              readableStream.pipe(writeableStream);

           });   
        }
        });
    }


createCss(bundleWay);
console.log('File created successfully!');