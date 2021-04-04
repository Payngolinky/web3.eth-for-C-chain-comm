const Web3 = require("web3")
const { ethers } = require('ethers')

let mnemonic = "about dutch spy parrot above cry lunch believe ripple radar tomato globe over unfair symbol atom balance ill hen rough tiger era upper favorite";
const web3 = new Web3(new Web3.providers.HttpProvider("https://api.avax-test.network/ext/bc/C/rpc"))

const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
eth_privatekey = wallet.privateKey;
const tokenAddress = "0xe66BC94A29A01ea0E897C1bAFe0625C5dA31BC58"  //SHITTKN CONTRACT ADDRESS

let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ];

let contract = new web3.eth.Contract(minABI,tokenAddress);                //different ERC20 token contract can be read here
const token_name = "SHITTKN"

async function main(){
    getBalance().then(function (result) {            //shit coin balance
        console.log(result +" " + token_name);
    });
    console.log(contract)

    web3.eth.getBalance(wallet.address, function(err, result) {     //eth balance read
        if (err) {
          console.log(err)
        } else {
          console.log(web3.utils.fromWei(result, "ether") + " ETH")
        }
      })

    web3.eth.getTransactionCount(wallet.address)
    .then(console.log);
    

    const createTransaction = await web3.eth.accounts.signTransaction(
        {
           gas: 21000,
           to: "0x22b2b66191390738e861D25E987FAB2554060bf6",
           value: web3.utils.toWei('0.15', 'ether'),     //  <<<<------- how many tokens are we sending? 
        },
        eth_privatekey
     );
     const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
     );
     console.log(
        `Transaction successful with hash: ${createReceipt.transactionHash}`
     );
  };
main().catch((err) => {
    console.log("We have encountered an error!")
    console.error(err)
})
async function getBalance() {
    balance = await contract.methods.balanceOf(wallet.address).call();
    converted_balance = web3.utils.fromWei(balance, 'ether') //web3.fromWei(balance, 'ether')
    return converted_balance;
  }