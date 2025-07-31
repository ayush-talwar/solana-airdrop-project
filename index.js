const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const wallet = new Keypair(); // creates wallet of type key pair

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;
// console.log(publicKey, secretKey);

const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const getBalance = await connection.getBalance(publicKey);
        console.log(`My balance is ${getBalance}`);
    } catch(err){
        console.log(err);
    }
}

const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        performAirDrop = await connection.requestAirdrop(publicKey, 2*LAMPORTS_PER_SOL); // 1B -> 1SOL so here we are requesting 2SOLs
        await connection.confirmTransaction(performAirDrop);
    } catch(err) {
        console.log(err);
    }
}

const main = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

main()