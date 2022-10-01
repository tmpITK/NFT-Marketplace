import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getExistingNfts' : ActorMethod<[], Array<Principal>>,
  'getListings' : ActorMethod<[], Array<Principal>>,
  'getOwnedNfts' : ActorMethod<[Principal], Array<Principal>>,
  'listNftForSale' : ActorMethod<[Principal, bigint], string>,
  'mint' : ActorMethod<[string, string], Principal>,
}
