pragma solidity >=0.7.0 <0.9.0;

contract Market {

    address [] public nftList;
    mapping(address => address []) public ownerMap;

    function mint(string memory name, string memory imgHash) public payable returns(address){
        address newNft = address(new Nft(name, msg.sender, imgHash));
        nftList.push(newNft);
        addNftToOwner(newNft, msg.sender);

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

    function getOwnedNft(address owner, uint index) private view returns (address){
        require(ownerMap[owner].length > 0);
        // I will call this only so I will have to chekc for size beforehand
        return ownerMap[owner][index];
    }

}


contract Nft {

    string name;
    address owner;
    string imageHash;

    constructor (string memory assetName, address assetOwner, string memory ipfsHash) {
        name = assetName;
        owner = assetOwner;
        imageHash = ipfsHash;
    }

    function getNftInfo() public view returns (string memory, address, string memory){
        return (
            name,
            owner,
            imageHash
        );
    }

}
