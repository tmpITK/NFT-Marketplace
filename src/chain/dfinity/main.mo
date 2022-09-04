import HashMap  "mo:base/HashMap";
import Principal "mo:base/Principal";
import Cycles "mo:base/Cycles";
import List "mo:base/List";
import NftActorClass "./nft";


actor MarketPlace {
  var nftMap = HashMap.HashMap<Principal, NftActorClass>(1, Principal.equal, Principal.hash);
  var ownerMap = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

  public shared(msg) func mint(name: Text, imageHash: Text) : async Principal {
    let owner : Principal = msg.caller;

    Cycles.add(100_000_000_000);

    let mintedNft = await NftActorClass(name, owner, imageHash);
    let mintedNftPrincipal = await mintedNft.getCanisterId();

    nftMap.put(mintedNftPrincipal, mintedNft);
    addNftToOwner(mintedNftPrincipal, owner);
  }

  private func addNftToOwner(nftId: Principal, owner: Principal) {
    var ownedNfts : List.List<Principal> = switch (ownerMap.get(owner)) {
      case null List.nil<Principal>();
      case (?result) result;
    }

    ownedNfts := List.push(nftId);
    ownerMap.put(owner, ownedNfts);
  }
}