const { Alchemy, Network } = require('alchemy-sdk')

const config = {
    apiKey: "CVLadiewE3TS80rHjQydiSyJsxVSIjV6",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);


const fetchTransactionsFromAlchemy = async (address) => {
    const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    // data.transfers.forEach
    data.transfers.forEach(element => {
        const hash = element.hash
        const getTimeStamp = async()=>{
            let res = await alchemy.core.getBlock(hash)
            return res.timestamp
        }
        let timestamp = getTimeStamp()
        
    });
    // console.log(data);
    
}

const getTransactions = async (req, res) => {
    const address = req.params.address
    const page = req.query.page || 1
    const pageSize = 10

    try {
        const transactions = await Transaction.find({
            $or: [{ from: address }, { to: address }],
        })
            .sort({ timestamp: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)

        res.status(200).json(transactions)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}