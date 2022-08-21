pragma solidity >=0.7.0 <0.9.0;

contract Market {

    struct Listing {
        uint index;
        uint price;
        address seller;
    }

    struct userNftStorageInfo {
        uint nextLoc;
        uint numOwnedNfts;
    }

    address [] public nftList;
    mapping(address => address []) public ownerMap;
    uint nextNftIndex = 0;
    Listing [] public listings;
    mapping(address => userNftStorageInfo) public userNftStorageInfoMap;

    function mint(string memory name, string memory imgHash) public returns(address){
        address newNft = address(new Nft(name, imgHash, nextNftIndex, address(this)));
        addNftToOwner(newNft, msg.sender);
        
        nftList.push(newNft);
        nextNftIndex +=1;
    }

    function getNumberOfNfts() public view returns(uint) {
        return nftList.length;
    }

    function addNftToOwner(address nftAddress, address owner) private {
        userNftStorageInfo memory userStorageInfo = userNftStorageInfoMap[owner];

        if (userStorageInfo.numOwnedNfts == ownerMap[owner].length) {
            ownerMap[owner].push(nftAddress);
            userStorageInfo.nextLoc += 1;
        } else {
            ownerMap[owner][userStorageInfo.nextLoc] = nftAddress;
            userStorageInfo.nextLoc = getNextEmptyLocationForNft(owner);
        }

        userStorageInfo.numOwnedNfts += 1;
        userNftStorageInfoMap[owner] = userStorageInfo;
        Nft(nftAddress).setOwner(owner);
    }

    function getNextEmptyLocationForNft(address owner) private view returns(uint) {
        address nullAddress = address(0);
        userNftStorageInfo memory userStorageInfo = userNftStorageInfoMap[owner];

        for (uint i = 0; i < ownerMap[owner].length; i++) {
            if (ownerMap[owner][i] == nullAddress && i != userStorageInfo.nextLoc) {
                return i;
            }
        }
        return ownerMap[owner].length;
    }

    function removeNftFromOwner(address nftAddress, address owner) private {
        // search for address and remove
        address [] memory ownedNftList = ownerMap[owner];
        int indexOfFirstEmpty = -1;
        for(uint i=0; i<ownedNftList.length; i++) {
            if(ownedNftList[i] == nftAddress) {
                delete ownedNftList[i];
                ownerMap[owner] = ownedNftList;
                if (indexOfFirstEmpty == -1) {
                    userNftStorageInfoMap[owner].nextLoc = i;
                }
                userNftStorageInfoMap[owner].numOwnedNfts -= 1;
                break;
            }
            if (indexOfFirstEmpty == -1) {
                userNftStorageInfoMap[owner].nextLoc = i;
            }
        }
    }

    function getOwnedNft(address owner, uint index) public view returns (address){
        require(ownerMap[owner].length > 0);
        // I will call this only so I will have to check for size beforehand
        return ownerMap[owner][index];
    }

    function getNumberOfOwnedNfts(address owner) public view returns(uint) {
        return userNftStorageInfoMap[owner].numOwnedNfts;
    }

    function listNftForSale(address nftAddress, uint index, uint value) public {
        require(index < nftList.length);
        //require(listings[nftAddress].price == 0); // it is not yet up for sale
        listings.push(Listing(index, value, tx.origin));

        addNftToOwner(nftAddress, address(this));
        removeNftFromOwner(nftAddress, tx.origin);
    }

    function getNumberOfListedNfts() public view returns (uint) {
        return listings.length;
    }

    function buyNft(address nftAddress, uint nftPrice, uint listingIndex) public payable {
        require(msg.value == nftPrice);
        Listing memory nftListing = popListingForNft(listingIndex);
        removeNftFromOwner(nftAddress, address(this));
        payable(nftListing.seller).transfer(nftPrice);
        addNftToOwner(nftAddress, tx.origin);    
    }

    function popListingForNft(uint listingIndex) private returns(Listing memory) {
        // I am too lazy and too suspicious about this. I think there is a better way
        // to remove items from lists and not track the emptied places. I could do it again
        // but I won't for now.

        Listing memory nftListing = listings[listingIndex];
        delete listings[listingIndex];
        return nftListing;


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

    function getIndex() public view returns(uint) {
        return index;
    }

    function getOwner() public view returns(address) {
        return owner;
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
