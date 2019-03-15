const Web3 = require('web3');
const {address, abi} = require('./lottery');
require('dotenv').config();

const rpcURL = "https://rinkeby.infura.io/v3/" + process.env.API_KEY;
let web3 = new Web3(rpcURL);
const lottery = new web3.eth.Contract(abi, address);

// console.log(lottery);

let descriptions = async () => Promise.resolve(lottery.methods.description().call());

descriptions().then(desc => module.exports = desc);