const fetch = require('node-fetch');
require('dotenv').config();

if (!process.env.FIGMA_PERSONAL_ACCESS_TOKEN) {
  throw new Error(`Put your Figma token in a .env in the root directory of this directory.
  The .env file should look like this:
  PERSONAL_ACCESS_TOKEN='xxxx'`);
}

const requestConfig = {
  method: 'GET',
  headers: { "x-figma-token": process.env.FIGMA_PERSONAL_ACCESS_TOKEN }
};

const requestUrl = 'https://api.figma.com/v1/files/';

const getFigmaDocument = (id) => (
  fetch(`${requestUrl}${id}`, requestConfig)
    .then(response => response.json())
    .catch(error => ({ err: error }))
);

module.exports = getFigmaDocument;