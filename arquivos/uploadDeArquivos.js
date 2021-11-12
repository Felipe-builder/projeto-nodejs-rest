const fs = require('fs')

fs.createReadStream('./assets/pastor-alemao.jpg')
    .pipe(fs.createWriteStream('./assets/pastor-alemao-stram.jpg'))
    .on('finish', () => console.log('Imagem foi escrita com sucesso'))
