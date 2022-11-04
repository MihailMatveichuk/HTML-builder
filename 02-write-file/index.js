// const process = require('process');
var path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

fs.open(path.join(__dirname, '../02-write-file/file.txt'), 'w', (err) => {
  if(err) throw err;
  stdout.write('Введите текст!\n');
    process.on('SIGINT', ()=>{
      console.log('Удачи в изучении Node.js!');
      process.exit();
    });
  });

    stdin.on('data', key => {
      fs.appendFile(path.join(__dirname, '../02-write-file/file.txt'), key, (err) => {
        if(err) throw err;
    });
  });

  process.stdin.on('data', function (wordKey) {
    if(wordKey.toString().toLowerCase().trim() === 'exit'){
      console.log('Удачи в изучении Node.js!');
      process.exit();
    }
});

