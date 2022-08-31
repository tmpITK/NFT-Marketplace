

class AdapterInterface {

    constructor() {
        this.web3 = undefined;
    }

    notDefined() {
        throw "Not defined Chain Adapter method";
    }

    get getMarket() {
        this.notDefined();
    }

    get getNft() {
        this.notDefined();
    }

    get getNftList() {
        this.notDefined();
    }

    get getNftImage() {
        this.notDefined();
    }

    get getUserAddress() {
        this.notDefined();
    }

    get getNumberOfOwnedNfts() {
        this.notDefined();
    }

    get getOwnedNfts() {
        this.notDefined();
    }

    get getListedNfts() {
        this.notDefined();
    }

    mint() {
        this.notDefined();
    }

    listNftForSale() {
        this.notDefined();
    }

    buyNft() {
        this.notDefined(); 
    }

}


export default AdapterInterface;