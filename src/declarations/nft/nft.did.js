export const idlFactory = ({ IDL }) => {
  const Nft = IDL.Service({
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'getIpfsHash' : IDL.Func([], [IDL.Text], ['query']),
    'getName' : IDL.Func([], [IDL.Text], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return Nft;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Text];
};
