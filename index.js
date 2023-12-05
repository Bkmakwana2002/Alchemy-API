const express = require('express')
const app = express()
const { Alchemy, Network } = require('alchemy-sdk')
const connectDB = require('./db')
const transaction_routes = require('./routes/transactions')
const token_routes = require('./routes/token')

const config = {
    apiKey: "CVLadiewE3TS80rHjQydiSyJsxVSIjV6",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require("dotenv").config({ path: './.env' })
connectDB()

const func = async()=>{
    const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: "0x7915eC065B644568155C4772a286Addad3864C1b",
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    let owner  = "0x7915eC065B644568155C4772a286Addad3864C1b";
   // const tokenData = await alchemy.core.getTokenMetadata("0x7915eC065B644568155C4772a286Addad3864C1b")
   let response = await alchemy.nft.getNftsForOwner(owner);
    console.log(data.transfers);
}
// fetchTransactionsFromAlchemy()\
//func()

app.use('/api',transaction_routes)
app.use('/api',token_routes)

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})