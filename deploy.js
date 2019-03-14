const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const {wallet} = require("./.env");

const provider = new HDWalletProvider(
    {wallet},
    "https://rinkeby.infura.io/v3/60e0104a8f47427abe1c077cf2e37197"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Deploy from account: ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({gas: '1000000', from: accounts[0]});

    console.log(interface);
    console.log('Contract deployed to: ' + result.options.address);
};
deploy();

module.exports = web3;