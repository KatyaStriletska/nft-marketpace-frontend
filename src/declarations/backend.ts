import { IDL } from "@dfinity/candid";

export const idlFactory = ({ IDL }: { IDL: typeof import("@dfinity/candid").IDL }) =>
  IDL.Service({
    getMessage: IDL.Func([], [IDL.Text], ["query"]),
    setMessage: IDL.Func([IDL.Text], [], []),
  });

export const canisterId = "avqkn-guaaa-aaaaa-qaaea-cai"; // Вкажіть ID вашої каністри
