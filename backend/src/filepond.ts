import * as fs from 'fs';
import * as path from 'path';
import { appConfig } from '.';

// https://stackoverflow.com/a/40899767/1787829
// express' res.sendFile? https://stackoverflow.com/a/17516733/1787829
const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript',
};

const handleLoad = (id, res) => {
  const filename = path.join(appConfig.uploads.publicDir, path.sep, id);
  const extension = path.extname(filename).slice(1);
  console.log(filename);
  console.log(extension);
  const type = mime[extension] || 'text/plain';
  console.log(type);

  const fileStream = fs.createReadStream(filename);
  fileStream.on('open', () => {
    res.set('Content-Type', type);
    res.set('Content-Disposition', `inline; filename="${id}"`);
    console.log('Piping image to response');
    fileStream.pipe(res);
  });
  fileStream.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not foundddd');
  });
};

// maybe use shortid.isValid(id) here?
// save files to id directory? files/public/41XTDbE/original-name.jpg
export const handleGET = (req, res, next) => {
  console.log(req.query);
  if (req.query.load) {
    handleLoad(req.query.load, res);
  } else {
    res.status(400);
    res.send('Invalid file id');
  }
};
