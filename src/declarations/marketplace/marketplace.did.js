export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getListings' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getOwnedNfts' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'listNftForSale' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'mint' : IDL.Func([IDL.Text, IDL.Text], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
