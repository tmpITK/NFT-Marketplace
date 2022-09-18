import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getOwnedNfts' : ActorMethod<[Principal], Array<Principal>>,
  'mint' : ActorMethod<[string, string], Principal>,
}
