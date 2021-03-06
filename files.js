"use strict";

const fs = require('fs');

module.exports = (ellipsis, configJsonString, enterpriseId) => {
  const client = require('./sdk')(ellipsis, configJsonString, enterpriseId);
  
  return {
    
    uploadWithTimestamp: function(filename, contentType, dataStream) {
      return new Promise((resolve, reject) => {
        const timestampedFilename = `${Number(new Date())}-${filename}`;
        const tmpFilePath = `/tmp/${timestampedFilename}`;
        dataStream.pipe(fs.createWriteStream(tmpFilePath)).on('finish', () => {
          client.files.uploadFile('0', timestampedFilename, fs.createReadStream(tmpFilePath)).then(res => {
            const fileId = res.entries[0].id;
            if (fileId) {
              client.files.update(fileId, {shared_link: client.accessLevels.DEFAULT}).then(file => {
                resolve({
                  url: file.shared_link.url,
                  downloadUrl: file.shared_link.download_url
                });
              });
            } else {
              reject("No file ID");
            }
          });
        });
      });
    }
    
  };
  
}
