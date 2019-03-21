const dropboxV2Api = require('dropbox-v2-api');
const fs = require('fs');
const path = require('path');


const args = require('minimist')(process.argv.slice(2));
const inputFile=args.f; // Input file name from command line $>node app.js -f "file_name"

if (inputFile) {
	const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'Secrets/credentials.json')));
	const dropbox = dropboxV2Api.authenticate({
	  token: credentials.APP_ACCESS_TOKEN
	});
	
	const authUrl = dropbox.generateAuthUrl();

	dropbox({
	  resource: 'files/upload',
	  parameters: {
	      path: "/from-mysql-commandline/" + inputFile  
	  },
	  readStream: fs.createReadStream(path.join(__dirname, inputFile))
	}, (err, result, response) => {
		if (err) {
	  	console.log("Dropbox Upload error ", err);
	  	console.log("result ", result);
			process.exit(1);
		} else {
			process.exit(0);
		}
	});
	

} else {
	console.log("Upload to dropbox error, -f not defined" );
	process.exit(1);
}

