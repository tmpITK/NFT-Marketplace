pragma solidity >=0.7.0 <0.9.0;

contract Market {

    struct Listing {
        uint index;
        uint price;
    }

    address [] public nftList;
    mapping(address => address []) public ownerMap;
    uint nextNftIndex = 0;
    Listing [] public listings;

    function mint(string memory name, string memory imgHash) public returns(address){
        address newNft = address(new Nft(name, imgHash, nextNftIndex, address(this)));
        
        nftList.push(newNft);
        addNftToOwner(newNft, msg.sender);
        nextNftIndex +=1;

        return newNft;
    }

    function getNumberOfNfts() public view returns(uint) {
        return nftList.length;
    }

    function addNftToOwner(address nftAddress, address owner) private {

        if(ownerMap[owner].length > 0) {
            ownerMap[owner].push(nftAddress);
        }
        ownerMap[owner] = [nftAddress];
        Nft(nftAddress).setOwner(owner);
    }

    function removeNftFromOwner(address nftAddress, address owner) private {
        // search for address and remove
        for(uint i=0; i<ownerMap[owner].length; i++) {
            if(ownerMap[owner][i] == nftAddress) {
                delete ownerMap[owner][i];
                break;
            }
        }
    }

    function getOwnedNft(address owner, uint index) public view returns (address){
        require(ownerMap[owner].length > 0);
        // I will call this only so I will have to chekc for size beforehand
        return ownerMap[owner][index];
    }

    function getNumberOfOwnedNfts(address owner) public view returns(uint) {
        return ownerMap[owner].length;
    }

    function listNftForSale(address nftAddress, uint index, uint value) public {
        require(index < nftList.length);
        //require(listings[nftAddress].price == 0); // it is not yet up for sale
        listings.push(Listing(index, value));

        addNftToOwner(nftAddress, address(this));
        removeNftFromOwner(nftAddress, msg.sender);
    }

    function getNumberOfListedNfts() public view returns (uint) {
        return listings.length;
    }

}


contract Nft {

    string name;
    address owner;
    string imageHash;
    uint index;
    address market;

    modifier onlyOwningMarketCan {
        require(msg.sender == market);
        _;
    }

    constructor (string memory assetName, string memory ipfsHash, uint globalIndex, address owningMarket) {
        name = assetName;
        imageHash = ipfsHash;
        index = globalIndex;
        market = owningMarket;
    }

    function setOwner(address addressNewOwner) public onlyOwningMarketCan {
        owner = addressNewOwner;
    }   

    function getNftInfo() public view returns (string memory, address, string memory, uint){
        return (
            name,
            owner,
            imageHash,
            index
        );
    }

}
