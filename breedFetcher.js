const request = require("request");
const breedID = process.argv[2];

const breedFetcher = function(breed) {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedID}`;
  request(url, (error, response, body) => {
    if (error) {
      console.log("Failed to find resource: \n", error);
      return;
    }
    let bodyObject = JSON.parse(body);// console.log("Response: ", response);
    if (bodyObject.length < 1) {
      console.log("Sorry! Couldnt find that breed: ", breedID, '\nError code: ', error);
      return;
    }
    let breed = bodyObject[0];
    // console.log(bodyObject);
    console.log(
      `Here's all of the info I could find about ${breed.name} cats:\n${breed.temperament}, these cats come from ${breed.origin}, ${breed.description}`
    );
  });
};

if (!breedID) {
  console.log("Input Error: breedID required...");
  console.log(`Usage Guide : node breedFetcher.js <breedID> \n<breedID> is usually the first 3 or 4 characters of the breed's name. \nex: abys => abyssinian, sib => siberian, `);
} else {
  breedFetcher(breedID);
}