import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApiError = { 'ZeroAddress' : null } |
  { 'InvalidTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null };
export interface BurnRequest { 'token_id' : bigint }
export interface ExtendedMetadataResult {
  'token_id' : bigint,
  'metadata_desc' : MetadataDesc,
}
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<[string, string]>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<[string, string]>,
  'status_code' : number,
}
export interface InitArgs {
  'logo' : [] | [LogoResult],
  'name' : string,
  'custodians' : [] | [Array<Principal>],
  'symbol' : string,
}
export type InterfaceId = { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Approval' : null } |
  { 'TransactionHistory' : null } |
  { 'TransferNotification' : null };
export interface LogoResult { 'data' : string, 'logo_type' : string }
export type ManageResult = { 'Ok' : null } |
  { 'Err' : ApiError };
export type MetadataDesc = Array<MetadataPart>;
export type MetadataKeyVal = [string, MetadataVal];
export interface MetadataPart {
  'data' : Uint8Array | number[],
  'key_val_data' : Array<MetadataKeyVal>,
  'purpose' : MetadataPurpose,
}
export type MetadataPurpose = { 'Preview' : null } |
  { 'Rendered' : null };
export type MetadataResult = { 'Ok' : MetadataDesc } |
  { 'Err' : ApiError };
export type MetadataVal = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'Nat8Content' : number } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'BlobContent' : Uint8Array | number[] } |
  { 'TextContent' : string };
export type MintReceipt = { 'Ok' : { 'id' : bigint, 'token_id' : bigint } } |
  { 'Err' : { 'Unauthorized' : null } };
export interface Nft {
  'id' : bigint,
  'content' : Uint8Array | number[],
  'owner' : Principal,
  'metadata' : MetadataDesc,
  'approved' : [] | [Principal],
  'price' : [] | [bigint],
}
export type OwnerResult = { 'Ok' : Principal } |
  { 'Err' : ApiError };
export type TransactionType = {
    'Approve' : { 'to' : Principal, 'token_id' : bigint, 'from' : Principal }
  } |
  { 'Burn' : { 'token_id' : bigint } } |
  { 'Mint' : { 'token_id' : bigint } } |
  { 'SetApprovalForAll' : { 'to' : Principal, 'from' : Principal } } |
  {
    'Transfer' : { 'to' : Principal, 'token_id' : bigint, 'from' : Principal }
  } |
  {
    'TransferFrom' : {
      'to' : Principal,
      'token_id' : bigint,
      'from' : Principal,
    }
  };
export type TxReceipt = { 'Ok' : bigint } |
  { 'Err' : ApiError };
export interface TxResult {
  'fee' : bigint,
  'transaction_type' : TransactionType,
}
export interface _SERVICE {
  'deleteNFT' : ActorMethod<[bigint], TxReceipt>,
  'approveDip721' : ActorMethod<[Principal, bigint], TxReceipt>,
  'balanceOfDip721' : ActorMethod<[Principal], bigint>,
  'burnDip721' : ActorMethod<[bigint], TxReceipt>,
  'buyNFT' : ActorMethod<[bigint], TxReceipt>,
  'deleteNFT' : ActorMethod<[bigint], TxReceipt>,
  'getAllNFTs' : ActorMethod<[], Array<Nft>>,
  'getApprovedDip721' : ActorMethod<[bigint], TxReceipt>,
  'getAssetDip721' : ActorMethod<[bigint], Uint8Array | number[]>,
  'getAvailableNFTs' : ActorMethod<[], Array<Nft>>,
  'getCaller' : ActorMethod<[], Principal>,
  'getMetadataDip721' : ActorMethod<[bigint], MetadataResult>,
  'getMetdataForUserDip721' : ActorMethod<
    [Principal],
    Array<ExtendedMetadataResult>
  >,
  'getNftByIdDip721' : ActorMethod<[bigint], [] | [Nft]>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'isApprovedForAllDip721' : ActorMethod<[Principal], boolean>,
  'is_custodian' : ActorMethod<[Principal], boolean>,
  'listNFTForSale' : ActorMethod<
    [bigint, bigint],
    { 'ok' : bigint } |
      { 'err' : string }
  >,
  'logoDip721' : ActorMethod<[], LogoResult>,
  'mintDip721' : ActorMethod<
    [Principal, MetadataDesc, Uint8Array | number[], bigint],
    MintReceipt
  >,
  'nameDip721' : ActorMethod<[], string>,
  'ownerOfDip721' : ActorMethod<[bigint], OwnerResult>,
  'safeTransferFromDip721' : ActorMethod<
    [Principal, Principal, bigint],
    TxReceipt
  >,
  'safeTransferFromNotifyDip721' : ActorMethod<
    [Principal, Principal, bigint, Uint8Array | number[]],
    TxReceipt
  >,
  'setApprovalForAllDip721' : ActorMethod<[Principal, boolean], TxReceipt>,
  'set_custodian' : ActorMethod<[Principal, boolean], ManageResult>,
  'set_logo' : ActorMethod<[[] | [LogoResult]], ManageResult>,
  'set_name' : ActorMethod<[string], ManageResult>,
  'set_symbol' : ActorMethod<[string], ManageResult>,
  'supportedInterfacesDip721' : ActorMethod<[], Array<InterfaceId>>,
  'symbolDip721' : ActorMethod<[], string>,
  'tokensOfOwnerDip721' : ActorMethod<[Principal], BigUint64Array | bigint[]>,
  'totalSupplyDip721' : ActorMethod<[], bigint>,
  'transferFromDip721' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
  'transferFromNotifyDip721' : ActorMethod<
    [Principal, Principal, bigint, Uint8Array | number[]],
    TxReceipt
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
