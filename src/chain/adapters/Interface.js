

function not_defined(name) {
    throw "Not defined Chain Adapter method";
}

let AdapterInterface = {
    getMarket: not_defined,
    getNft: not_defined,
    mint: not_defined,
    getNftList: not_defined,
    getNftImage: not_defined,
    getUserAddress: not_defined,
    getNumberOfOwnedNfts: not_defined,
    getOwnedNfts: not_defined,
    getListedNfts: not_defined,
    listNftForSale: not_defined,
    buyNft: not_defined,
}

export default AdapterInterface;