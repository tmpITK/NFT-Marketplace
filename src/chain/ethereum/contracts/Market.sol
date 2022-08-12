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
        address newNft = address(new Nft(name, msg.sender, imgHash, nextNftIndex));
        
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
    }

    function removeNftFromOwner(address nftAddress, address owner) private {
        // search for address and remove
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
    }

}


contract Nft {

    string name;
    address owner;
    string imageHash;
    uint index;

    constructor (string memory assetName, address assetOwner, string memory ipfsHash, uint globalIndex) {
        name = assetName;
        owner = assetOwner;
        imageHash = ipfsHash;
        index = globalIndex;
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
