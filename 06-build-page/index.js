const fs = require('fs');
const {rmdir, rm} = require('fs/promises');
const path = require('path');
const projectDir = path.join(__dirname, '../06-build-page/project-dist');
const styleWay = path.join(__dirname, "../06-build-page/styles");
const cssWay = path.join(__dirname, '../06-build-page/project-dist/style.css');
const indexWay = path.join(__dirname, '../06-build-page/project-dist/index.html');
const assetsWay = path.join(__dirname, '../06-build-page/project-dist/assets');




function makeProjectDir(){
    fs.access(path.join(projectDir), (err) => {
        if (err) {
            fs.mkdir(path.join(projectDir), { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });
            // copyDir();
        } else {
            console.log('This directory has already exists');
        }
    });
}

// Make and copy index.html

async function makeIndexDir(){
    await rm(indexWay, {force: true}); 
fs.access(path.join(indexWay), (err) => {
    if (err) {
        fs.open(path.join(indexWay), 'w', (err) => {
            if(err) throw err;
            });
            console.log('File index.html created successfully');
            // copyDir(neededWay, bundleWay);
        } else {
            if(err){
                console.error(err.message);
                return;
            }
            console.log("File index.html have already exist");
        } 
    });
}

function copyIndexDir() {
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

// Make and copy style.css

async function makeCssDir(){
await rm(cssWay, {force: true}); 
fs.access(path.join(cssWay), (err) => {
    if (err) {
        fs.open(path.join(cssWay), 'w', (err) => {
            if(err) throw err;
            });
            console.log('File style.css created successfully');
            copyCssDir();
            // copyDir(neededWay, bundleWay);
        } else {
            if(err){
                console.error(err.message);
                return;
            }
            console.log("File style.css have already exist");
        } 
    });
}

function copyCssDir() {
    fs.readdir(styleWay, { withFileTypes: true }, (err, files) => {
        if (err) console.log(err);
        else {
           let styleFiles = files.filter(file=>file.name.split('.')[1] === 'css');
           styleFiles.forEach(file=>{
              let readableStream = fs.createReadStream(path.join(styleWay, file.name), 'utf8');
              let writeableStream = fs.createWriteStream(cssWay, {flags: 'a'});
              readableStream.pipe(writeableStream);
           });   
        }
        });
}

// Make assets folder

async function makeAssetsFolder(){
    fs.access(path.join(assetsWay), (err) => {
        if (err) {
            fs.mkdir(path.join(assetsWay), { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory assets created successfully!');
            });
            // copyDir();
        } else {
            console.log('This assets directory has already exists');
        }
    });
    }



makeProjectDir();
makeIndexDir();
makeCssDir();
makeAssetsFolder();

