import web3 from '../deploy';
const {address, abi} = require('./lottery');

const lottery = new web3.eth.Contract(abi, address);

async function getOwner() {
    const owner = await lottery.methods.description().call();
    console.log(owner);
}

getOwner();