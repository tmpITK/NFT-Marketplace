import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class Nft (assetName: Text, assetOwner: Principal, assetIpfsHash: Text) = this {
    
    private let name = assetName;
    private var owner = assetOwner;
    private let ipfsHash = assetIpfsHash;

    public query func getName() : async Text{
        return name;
    };

    public query func getOwner() : async Principal {
        return owner;
    };

    public query func getIpfsHash() : async Text {
        return ipfsHash;
    };

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

};