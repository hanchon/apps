// import { readContract } from "viem/dist/types/actions/public/readContract";
// import { CosmosAddress, HexAddress } from "../../wallet";
// import { TokenMinDenom } from "../types";
// import { ABIKey, getAbi, ABI } from "./get-abi";
// import { writeContract } from "wagmi/dist/actions";
// type AbiByKey<T extends ABIKey> = (typeof ABI)[T];

// type AbiReadFunctions<T extends ABIKey> = Extract<
//   AbiByKey<T>[number],
//   {
//     type: "function";
//     stateMutability: "view" | "pure";
//   }
// >;

// type AbiWriteFunctions<T extends ABIKey> = Extract<
//   AbiByKey<T>[number],
//   {
//     type: "function";
//     stateMutability: "nonpayable" | "payable";
//   }
// >;

// type AbiFunctionByName<
//   T extends ABIKey,
//   TFn extends AbiByKey<T>[number]["name"],
// > = Extract<
//   AbiByKey<T>[number],
//   {
//     type: "function";
//     name: TFn;
//   }
// >;

// type AbiTypesMap = {
//   address: HexAddress;
//   uint256: bigint;
//   uint64: bigint;
//   uint8: bigint;
//   bytes: string;
//   string: string;
//   bool: boolean;
// };

// type CommonStringMaps = {
//   receiver: CosmosAddress;
//   denom: TokenMinDenom;
//   baseDenom: TokenMinDenom;
// };
// type AbiInput = Readonly<
//   | {
//       name: string;
//       type: keyof AbiTypesMap | `${keyof AbiTypesMap}[]`;
//     }
//   | {
//       name: string;
//       type: "tuple" | "tuple[]";
//       components: Readonly<AbiInput[]>;
//     }
// >;

// type BaseType<T extends string> = T extends `${infer U}[]` ? U : T;
// type InferInputType<T extends AbiInput> = T["type"] extends
//   | keyof AbiTypesMap
//   | `${keyof AbiTypesMap}[]`
//   ? AbiTypesMap[BaseType<T["type"]>]
//   : T extends {
//       type: "tuple" | "tuple[]";
//       components: Readonly<AbiInput[]>;
//     }
//   ? ObjectifyAbiInputs<T["components"]>
//   : never;

// type ObjectifyAbiInputs<T extends Readonly<AbiInput[]>> = {
//   [K in T[number] as K["name"]]: K["type"] extends `${string}[]`
//     ? InferInputType<K>[]
//     : InferInputType<K>;
// };

// type testInputs = AbiFunctionByName<"ics20", "transfer">["inputs"];
// //   ^?
// type test = ObjectifyAbiInputs<
//   //   ^?
//   Readonly<
//     [
//       {
//         name: "amount";
//         type: "uint256[]";
//       },
//       {
//         name: "timeoutHeight";
//         type: "tuple";
//         components: [
//           {
//             name: "revisionNumber";
//             type: "uint64";
//           },
//         ];
//       },
//     ]
//   >
// >;

// type test2 = (typeof ABI)[ABIKey][number]["inputs"][number]["type"];

// readPrecompile('erc20', 'balanceOf', {account: '0x1234' })

// export const unpackInputs = ( inputs:  Readonly<AbiInput[]>, inputsMap: Record<) => {
//   return inputs.map((input) => {
//     if(input.type === 'tuple') {
//       // return unpackInputs(input.components)
//     }

//   });
// }
// export function readPrecompile<
//   T extends ABIKey,
//   TFn extends AbiReadFunctions<T>["name"],
// >(
//   abiKey: T,
//   functionName: TFn,
//   args: ObjectifyAbiInputs<AbiFunctionByName<T, TFn>["inputs"]>
// ) {
//   const abi = getAbi(abiKey);
//   writeContract({
//     abi,
//     functionName,
//     args: abi.find((abi) => abi.name === functionName)?.inputs.map((input) => {
//       return args[input.name];

//   })),

//   })
// }

// export function writePrecompile<
//   T extends ABIKey,
//   TFn extends AbiWriteFunctions<T>["name"],
// >(
//   abiKey: T,
//   functionName: TFn,
//   args: ObjectifyAbiInputs<AbiFunctionByName<T, TFn>["inputs"]>
// ) {
//   const abi = getAbi(abiKey);
// }
// // writePrecompile("ics20", "transfer", {
// //   amount: 100n,
// //   denom: "EVMOS",
// //   timeoutHeight: {
// //     revisionHeight: 0n,
// //     revisionNumber: 0n,
// //   },
// // });
