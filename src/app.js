const Web3 = require('web3');
const {address, abi} = require('./lottery');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const {wallet} = require("../.env");
require('dotenv').config();

const rpcURL = "https://rinkeby.infura.io/v3/" + process.env.API_KEY;

const immediateAccount = '0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1';

const provider = new HDWalletProvider(
    {wallet},
    rpcURL
);

const web3 = new Web3(provider);
const lottery = new web3.eth.Contract(abi, address);

// console.log(lottery);
// let accounts, players, elapsedTime;

// module.exports.getAccounts = getAccounts = async () => await web3.eth.getAccounts().then(acc => acc.toString()).then(account => getPlayers(account)); get accounts with players
module.exports.getAccounts = getAccounts = async () => await web3.eth.getAccounts();

module.exports.getDescription = getDescription = async () => Promise.resolve(lottery.methods.description().call());

module.exports.enterLottery = enterLottery = async () => await lottery.methods.enter().send({
    from: immediateAccount,
    value: web3.utils.toWei('0.06', 'ether'),
    gas: '1000000'
}).then(getPlayers);

module.exports.getPlayers = getPlayers = async (account) => {
    await lottery.methods.getPlayers().call({
        from: account
    });
};

module.exports.getTimeElapsed = getTimeElapsed = async () => await lottery.methods.elapsedTime().call();

module.exports.getActivity = getActivity = async () => await lottery.methods.isActive().call();

// getAccounts();
// getPlayers();
// enterLottery();
// getTimeElapsed();