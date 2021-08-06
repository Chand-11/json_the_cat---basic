const request = require('request');
const fs = require('fs');

const breedName = process.argv[2]; //breed name entered by user
const url = 'https://api.thecatapi.com/v1/breeds/search/?q=' + breedName;
const path = './index.html';



request(url, (error, response, body) => {

  if (response.statusCode !== 200) {
    console.log('there was an error');
  }

  // edge case: breed not found (invalid URL)
  if (response.statusCode === 404) {
    console.log(`The data you requested was not found`);
  }

  // edge case: request failed


  if (response.statusCode === 200) {

    fs.writeFile(path, body, err => {

      if (err) {
        console.log(err);
        return;
      }

      // if body was fetched successfully
      const data = JSON.parse(body);
      console.log(`description: ${data[0]['description']}`);
    
    });
  }
});