export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getOwnedNfts' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'mint' : IDL.Func([IDL.Text, IDL.Text], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
