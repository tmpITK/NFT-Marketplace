import Principal "mo:base/Principal";

actor class Nft (assetName: Text, assetOwner: Principal, ipfsHash: Text) {
    private let name: assetName;
    private var owner: assetOwner;
    private let imageHash: ipfsHash; // could store this on canisters, but for adaptibility will roll with ipfs

    public query func getName() : async Text {
        return name;
    };

    public query func getOwner() : async Principal {
        return owner;
    };

    public query func getImageHash() : async Text {
        return imageHash;
    };

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };
}

