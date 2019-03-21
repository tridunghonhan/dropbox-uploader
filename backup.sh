#!/bin/bash


# dump mysql to file
current=$(date +'%Y-%m-%d-%H-%M-%S')
fileName=vnremi-${current}.sql  
mysqldump -uroot -p${SQLROOTPASS} vnremi > $fileName # the SQLROOTPASS is set in ~/.bashrc on host

# zip it
zipFileName=${fileName}.zip
zip ${zipFileName} $fileName

# encrypt with key
encryptedFileName=${zipFileName}.enc
openssl enc -aes-256-cbc -salt -in $zipFileName -out $encryptedFileName -pass file:./Secrets/aes-encrypt-key.bin
##### Decrypt command 
##### openssl enc -d -aes-256-cbc -in $encryptedFileName -out $zipFileName -pass file:./Secrets/aes-encrypt-key.bin


# upload to dropbox
node ./app.js -f $encryptedFileName

# delete the local file
if [ $? == 0 ] ; then 
	rm vnremi-*
	echo "Backup database successfully completed" ; 
else 
	echo "There is an error happened. Please check"
fi
