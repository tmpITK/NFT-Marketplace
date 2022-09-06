import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Nft {
  'getCanisterId' : ActorMethod<[], Principal>,
  'getIpfsHash' : ActorMethod<[], string>,
  'getName' : ActorMethod<[], string>,
  'getOwner' : ActorMethod<[], Principal>,
}
export interface _SERVICE extends Nft {}
