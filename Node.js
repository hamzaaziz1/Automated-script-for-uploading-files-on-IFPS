const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = ''

const dirName1 = 'PICS'
const dirName2 = 'JSON_files'

var hashData = []
var i = 0
var j = 0

async function seedData() {
  // Loading all files in directory
  const dirs1 = await fs.readdirSync(dirName1);

  const dirs2 = await fs.readdirSync(dirName2);

  // Reading each file one by one 
  for (const fileName1 of dirs1) {
    const split = fileName1.split('.')

      const a = `${dirName1}/${fileName1}`
      //console.log(a);

      const formData = new FormData();
      const src = a;
      
      const file = fs.createReadStream(src)
      formData.append('file', file)
      
      const pinataMetadata = JSON.stringify({
        name: `${fileName1}`,
      });
      formData.append('pinataMetadata', pinataMetadata);
      
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      })
      formData.append('pinataOptions', pinataOptions);
  
      try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization': `Bearer ${JWT}`
          }
        });
        console.log(res.data);
        hashData[i] = res.data.IpfsHash;
        
        const fileName = dirs2[j]
        const b = `${dirName2}/${fileName}`

        const jsonData = {
            name: i,
            description: `${fileName1}`,
            image: `https://ipfs.io/ipfs/${hashData[j]}?filename=${fileName1}`
            };
        
            // Define the path where you want to create the JSON file
            const filePath = `JSON_files/${fileName1.split('.')[0]}.json`;
        //filename
            // Write the JSON data to the file
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('JSON file created successfully.');
            }
            });
        
          i +=1  
        
      } catch (error) {
        console.log(error);
      }
      j++;
      
  }
}
seedData()