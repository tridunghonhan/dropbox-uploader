const dropboxV2Api = require('dropbox-v2-api');
const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');
const Opn = require('opn');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'Secrets/credentials.json')));

const dropbox = dropboxV2Api.authenticate({
  token: credentials.APP_ACCESS_TOKEN
});

const authUrl = dropbox.generateAuthUrl();
dropbox({
  resource: 'files/upload',
  parameters: {
      path: '/from-mysql-commandline/testing.zip'
  },
  readStream: fs.createReadStream(path.join(__dirname, 'testing.zip'))
}, (err, result, response) => {
  console.log("error ", err);
  console.log("result ", result);
});
