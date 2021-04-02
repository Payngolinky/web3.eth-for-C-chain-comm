require('dotenv').config()
 
const Web3 = require('web3')
const axios = require('axios')
const EthereumTx = require('ethereumjs-tx')
const log = require('ololog').configure({ time: true })
const ansi = require('ansicolor').nice

 
const testnet = 'https://api.avax-test.network/ext/bc/C/rpc'

//https://api.avax-test.network/ext/bc/C/rpc

const web3 = new Web3( new Web3.providers.HttpProvider(testnet) )

web3.eth.defaultAccount = process.env.WALLET_ADDRESS

const amountToSend = 0.00100000

const main = async () => {

    //console.log("AVAX'S ETH address",web3.eth.defaultAccount);

    const ethAddr = web3.eth.defaultAccount

    //console.log("AVAX'S ETH address",web3);

    web3.eth.getBalance(ethAddr, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(web3.utils.fromWei(result, "ether") + " AVAX")
        }
        })


  }

  main()