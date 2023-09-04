const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require('got');
const axios = require('axios')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNjFiZDcxOS1jMGM1LTQ0YzktOGEyMi1iNTBiMWRhMWY0ZjgiLCJlbWFpbCI6ImhhbXphYXppejU4NzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJmNzYwMmZhNTIxYmExNTM4ZWJjIiwic2NvcGVkS2V5U2VjcmV0IjoiNTBlMTc4ZTAxOTM2NGU1ODNiY2VmNTg1YWYwMzBkZTY4NzRjZGRmYjZkZTlkNTM0MGVlOWMyMzc5MTAyNGZiYyIsImlhdCI6MTY5MzU2MjI4NH0.-8g1gb16DkHnEndW3jGsTZzJt0RdgxA3U4MMuVzW9ik'


//const dirName1 = 'Contract'



const pinDirectoryToPinata = async () => {
  // const dirs = await fs.readdirSync(dirName1);
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "JSON_files";
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }    


    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': `Bearer ${JWT}`
          }
        });
        console.log(res);



        const jsonData = {
          name: 'Contract',
          description: "",
          image: `https://ipfs.io/ipfs/${res.data.IpfsHash}?filename=contract.json`
          };
      
          // Define the path where you want to create the JSON file
          const filePath = `Contract/contract.json`;
      //filename
          // Write the JSON data to the file
          fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
          if (err) {
              console.error('Error writing JSON file:', err);
          } else {
              console.log('JSON file created successfully.');
          }
          });

  //   const response = await got(url, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
  //       "Authorization": JWT
  //     },
  //     body: data
  //   })		
  //   .on('uploadProgress', progress => {
	// console.log(progress);
  //   });
  //   console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};

pinDirectoryToPinata()