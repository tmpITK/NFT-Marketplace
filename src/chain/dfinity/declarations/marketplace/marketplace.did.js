export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'mint' : IDL.Func([IDL.Text, IDL.Text], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
