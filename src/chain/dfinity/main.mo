import HashMap  "mo:base/HashMap";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import List "mo:base/List";
import NftActorClass "nft";
import Debug "mo:base/Debug";


actor MarketPlace {
    var nftMap = HashMap.HashMap<Principal, NftActorClass.Nft>(1, Principal.equal, Principal.hash);
    var ownerMap = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

    public shared(msg) func mint(ipfsHash: Text, name: Text) : async Principal {
      let owner : Principal = msg.caller;
      Debug.print(debug_show(Cycles.balance()));
      Cycles.add(200_000_000_000);
      let mintedNft = await NftActorClass.Nft(name, owner, ipfsHash);
      Debug.print(debug_show(Cycles.balance()));
      let mintedNftPrincipal = await mintedNft.getCanisterId();

      nftMap.put(mintedNftPrincipal, mintedNft);
      addNftToOwner(mintedNftPrincipal, owner);

      return mintedNftPrincipal

    };

    private func addNftToOwner( nftId: Principal, owner: Principal) {
      var ownedNFTs : List.List<Principal> = switch (ownerMap.get(owner)) {
        case null List.nil<Principal>();
        case (?result) result;
      };

      ownedNFTs := List.push(nftId, ownedNFTs);
      ownerMap.put(owner, ownedNFTs);
    };

    public query func getOwnedNfts(owner: Principal) : async [Principal] {
      Debug.print("In get owned nfts");

      var ownedNFTs : List.List<Principal> = switch (ownerMap.get(owner)) {
        case null List.nil<Principal>();
        case (?result) result;
      };
      Debug.print("Before return");

      return List.toArray(ownedNFTs);
    }
}