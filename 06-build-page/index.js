const fs = require('fs');
const {copy} = require('fs-extra');
const {rm, readFile, readdir} = require('fs/promises');
const path = require('path');
const projectDir = path.join(__dirname, '../06-build-page/project-dist');
const styleWay = path.join(__dirname, "../06-build-page/styles");
const cssWay = path.join(__dirname, '../06-build-page/project-dist/style.css');
const indexWay = path.join(__dirname, '../06-build-page/project-dist/index.html');
const assetsAddress = path.join(__dirname, '../06-build-page/assets');
const assetsCopyWay = path.join(__dirname, '../06-build-page/project-dist/assets');
const templateWay = path.join(__dirname, '../06-build-page/template.html');
const components = path.join(__dirname, '../06-build-page/components');

// Make direction project-dist

function makeProjectDir(){

    fs.access(path.join(projectDir), (err) => {
        if (err) {
            fs.mkdir(path.join(projectDir), { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });
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
            copyIndexDir();
        } else {
            if(err){
                console.error(err.message);
                return;
            }
            console.log("File index.html have already exist");
        } 
    });

}

async function copyIndexDir() {

    let template = await readFile(templateWay, 'utf8');
    for (let filename of await readdir(components)) {
        if (path.parse(filename).ext === '.html') {
            let streamHTML = await readFile(path.join(components,filename), 'utf8');
            let regTemp = `{{${path.parse(filename).name}}}`;
            template = template.replace(regTemp, streamHTML);
        }
    }

    fs.createWriteStream(projectDir + "/index.html").write(template, "UTF8");
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

// Make and copy assets folder

function makeAssetsFolder(){

    fs.access(path.join(assetsCopyWay), (err) => {
        if (err) {
            fs.mkdir(path.join(assetsCopyWay), { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory assets created successfully!');
            });
        } else {
            console.log('This assets directory has already exists');
        }
    });

}

function copyAssetsDir() {

    fs.readdir(path.join(assetsAddress), { withFileTypes: true }, (err, files) => {
        if (err) console.log(err);
        else {
            files.forEach(file => {
            copy(path.join(assetsAddress, file.name), path.join(assetsCopyWay, file.name), (err)=>{
                if(err){
                    console.log(err);
                }
            });
            });
        }
    });
    
}


makeProjectDir();
makeIndexDir();
makeCssDir();
makeAssetsFolder();
copyAssetsDir();

