// *** Package Installation Instructions ***
// $ npm init -y
// $ npm install ethers
//
// *** Script Running Instructions ***
// $ node ERC20_C_to_ETH_addr.js

const { ethers } = require('ethers');

// Get ethers provider on AVAX Fuji Testnet
const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

// Define private key and create ethers wallet with signer abilities
const pvtKey = '0xe9f158bc2f10e3797cf603414747a5854d8f557173dd14905277fb976978b379';
const wallet = new ethers.Wallet(pvtKey, provider);

// Alternatively create wallet from mnemonic and connect to provider
/* const mnemonic = "about dutch spy parrot above cry lunch believe ripple radar tomato globe over unfair symbol atom balance ill hen rough tiger era upper favorite";
const walletMnemonic = new ethers.Wallet.fromMnemonic(mnemonic);
const wallet = walletMnemonic.connect(provider); */

// Define send destination of ERC20 token (MetaMask address)
const toAddr = '0x22b2b66191390738e861D25E987FAB2554060bf6';

// Define ERC20 (SHITTKN) contract address on AVAX Fuji Testnet
const tknAddr = '0xe66BC94A29A01ea0E897C1bAFe0625C5dA31BC58';

// ERC-20 Contract ABI for getting balance and transferring tokens
// Taken from https://docs.ethers.io/v5/getting-started/#getting-started--contracts
const tknAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the acount balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

/**
 * Get balance of destination wallet address as a string (MetaMask)
 * @returns Balance of destination wallet address as a string (4 decimal precision)
 */
const getBalance = async () => {
  // Create Contract object connected to provider
  const tknContract = new ethers.Contract(tknAddr, tknAbi, provider);

  // Get balance as BigNumber and convert to Number
  const balanceBigNum = await tknContract.balanceOf(toAddr);
  const balanceNum = Number(ethers.utils.formatEther(balanceBigNum));

  // Set precision and convert to string
  const precision = 4;
  const balanceStr = balanceNum.toFixed(precision).toString();

  return balanceStr;

} // const getBalance = ...

/**
 * Send 1 ERC20 Token from AVAX C-Chain to ETH Address
 */
const sendToken = async () => {
  if (provider === null || wallet === null) {
    console.error("Encountered null object, unable to send token.");
    return;
  } 

  // Create Contract object connected to wallet
  const tknContract = new ethers.Contract(tknAddr, tknAbi, wallet);

  // Specify amount to send (e.g. 1 ERC20 token)
  const amt = ethers.utils.parseEther("1.0");

  // Send amount to destination
  const tx = tknContract.transfer(toAddr, amt);

  return tx;

} // const sendToken = ...


// Log initial destination address balance
getBalance()
  .then(initBalance => {
    console.log("Initial destination balance: ", initBalance);

    // Send ERC20 token from AVAX wallet C-Chain to ETH address
    sendToken()
      .then(_tx => {
        console.log("Transfer successful!");

        // Log final destination address balance
        getBalance()
          .then(finalBalance => {
            console.log("Final destination balance: ", finalBalance);
          })
          .catch(console.error);
      })
      .catch(console.error);
  })
  .catch(console.error);
