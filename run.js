
const pinDirectoryToPinata = require('./Node.js'); 
pinDirectoryToPinata()
  .then(() => {
    console.log('Directory successfully uploaded to Pinata.');
  })
  .catch((error) => {
    console.error('Error uploading directory to Pinata:', error);
  });