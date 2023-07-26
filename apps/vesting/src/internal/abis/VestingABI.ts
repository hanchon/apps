/* tslint:disable */
/* eslint-disable */

export const VestingABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "vestingAddress",
        type: "string",
      },
    ],
    name: "balances",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "locked",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "unvested",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "vested",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "funderAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "accountAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "destAddress",
        type: "string",
      },
    ],
    name: "clawback",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "vestingAddress",
        type: "string",
      },
    ],
    name: "convertVestingAccount",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fromAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "toAddress",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "length",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Coin[]",
            name: "amount",
            type: "tuple[]",
          },
        ],
        internalType: "struct Period[]",
        name: "lockupPeriods",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "length",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Coin[]",
            name: "amount",
            type: "tuple[]",
          },
        ],
        internalType: "struct Period[]",
        name: "vestingPeriods",
        type: "tuple[]",
      },
      {
        internalType: "bool",
        name: "merge",
        type: "bool",
      },
    ],
    name: "createClawbackVestingAccount",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "funderAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "newFunderAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "vestingAddress",
        type: "string",
      },
    ],
    name: "updateVestingFunder",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
