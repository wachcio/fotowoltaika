// const path = require('path');

console.log(__dirname);

const fs = require('fs');

fs.writeFileSync(
  '/home/wachcio/Dokumenty/JavaScript/fotowoltaika/API_Node/log.txt',
  `${__dirname} test`,
);
